
import { formatBytes } from './formatters.js';
/**
 * Utility functions for browser-based image processing using HTML5 Canvas
 */
/**
 * Safely convert canvas to blob with dataURL fallback for any browser/webview
 */
export async function canvasToBlob(canvas, format = 'image/jpeg', quality = 0.92) {
  return new Promise((resolve) => {
    try {
      if (typeof canvas.toBlob === 'function') {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            // Fallback via dataUrl
            try {
              const dataUrl = canvas.toDataURL(format, quality);
              const arr = dataUrl.split(',');
              const mime = arr[0].match(/:(.*?);/)[1];
              const bstr = atob(arr[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              resolve(new Blob([u8arr], { type: mime }));
            } catch (err) {
              resolve(null);
            }
          }
        }, format, quality);
      } else {
        const dataUrl = canvas.toDataURL(format, quality);
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        resolve(new Blob([u8arr], { type: mime }));
      }
    } catch (e) {
      resolve(null);
    }
  });
}

/**
 * Read a File or Blob as a Data URL
 */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file from disk.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Load an image from File, Blob, HTMLImageElement, or Data URL
 */
export function loadImage(fileOrSrc) {
  return new Promise((resolve, reject) => {
    if (fileOrSrc instanceof HTMLImageElement && fileOrSrc.complete && fileOrSrc.naturalWidth > 0) {
      return resolve(fileOrSrc);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image. The file may be corrupt or in an unsupported format.'));
    };

    if (typeof fileOrSrc === 'string') {
      img.src = fileOrSrc;
    } else if (fileOrSrc instanceof Blob || fileOrSrc instanceof File) {
      readFileAsDataURL(fileOrSrc)
        .then((dataUrl) => {
          img.src = dataUrl;
        })
        .catch(reject);
    } else {
      reject(new Error('Invalid image source provided.'));
    }
  });
}

/**
 * Read basic file information and image dimensions without altering original data
 */
export async function getOriginalImageMeta(file) {
  if (!file) throw new Error('No file provided');

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (file.type && !validTypes.includes(file.type.toLowerCase())) {
    throw new Error('Unsupported format. Please select a JPG, JPEG, PNG, or WebP image.');
  }

  const dataUrl = await readFileAsDataURL(file);
  const img = await loadImage(dataUrl);
  const width = img.naturalWidth || img.width || 400;
  const height = img.naturalHeight || img.height || 400;

  return {
    name: file.name || 'uploaded-image.jpg',
    type: file.type || 'image/jpeg',
    size: file.size || Math.round(dataUrl.length * 0.75),
    formattedSize: formatBytes(file.size || Math.round(dataUrl.length * 0.75)),
    width,
    height,
    aspectRatio: width / height,
    imageElement: img,
    dataUrl,
    rawFile: file,
  };
}

/**
 * Resize image to exact width and height on canvas
 */
export async function resizeImageToDimensions({
  image,
  targetWidth,
  targetHeight,
  format = 'image/jpeg',
  quality = 0.92,
  backgroundColor = '#ffffff',
}) {
  if (
    !Number.isFinite(targetWidth) ||
    !Number.isFinite(targetHeight) ||
    targetWidth <= 0 ||
    targetHeight <= 0
  ) {
    throw new Error('Invalid target dimensions.');
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(targetWidth));
  canvas.height = Math.max(1, Math.round(targetHeight));

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available in this browser.');

  // Fill background with white for JPEG format to avoid black transparencies
  if (format === 'image/jpeg' || format === 'image/jpg') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const loadedImg = await loadImage(image);
  ctx.drawImage(loadedImg, 0, 0, canvas.width, canvas.height);

  const blob = await canvasToBlob(canvas, format, quality);
  if (!blob) throw new Error('Failed to generate resized image.');

  const dataUrl = await readFileAsDataURL(blob);

  return {
    blob,
    dataUrl,
    width: canvas.width,
    height: canvas.height,
    size: blob.size,
    formattedSize: formatBytes(blob.size),
  };
}

export async function compressImageToTargetSize({
  image,
  targetKb,
  initialWidth,
  initialHeight,
  format = 'image/jpeg',
  preserveExactDimensions = false,
  onProgress,
}) {
  if (!Number.isFinite(targetKb) || targetKb <= 0) {
    throw new Error('Invalid target file size.');
  }

  const targetBytes = Math.floor(targetKb * 1024);

  const loadedImg = await loadImage(image);

  const originalWidth = Math.round(
    initialWidth || loadedImg.naturalWidth || loadedImg.width || 800
  );

  const originalHeight = Math.round(
    initialHeight || loadedImg.naturalHeight || loadedImg.height || 600
  );

  let currentWidth = originalWidth;
  let currentHeight = originalHeight;

  let finalBlob = null;
  let finalQuality = 0.01;

  // Try current dimensions first.
  // If target cannot be achieved, gradually reduce dimensions.
  for (let dimensionAttempt = 0; dimensionAttempt < 12; dimensionAttempt++) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas 2D context not supported.');
    }

    canvas.width = currentWidth;
    canvas.height = currentHeight;

    if (format === 'image/jpeg' || format === 'image/jpg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      loadedImg,
      0,
      0,
      currentWidth,
      currentHeight
    );

    let low = 0.01;
    let high = 0.99;

    let bestBlob = null;
    let bestQuality = 0.01;

    // Binary search for highest quality under target
    for (let step = 0; step < 20; step++) {
      const quality = (low + high) / 2;

      const blob = await canvasToBlob(
        canvas,
        format,
        quality
      );

      if (!blob) continue;

      if (onProgress) {
        const dimensionProgress = dimensionAttempt / 12;
        const qualityProgress = (step / 20) / 12;

        onProgress(
          Math.min(
            95,
            Math.round((dimensionProgress + qualityProgress) * 100)
          )
        );
      }

      if (blob.size <= targetBytes) {
        bestBlob = blob;
        bestQuality = quality;

        // Try better quality
        low = quality;
      } else {
        // Too large
        high = quality;
      }
    }

    // Target successfully achieved
    if (bestBlob) {
      finalBlob = bestBlob;
      finalQuality = bestQuality;
      break;
    }

    // If exact dimensions are requested, don't resize.
    if (preserveExactDimensions) {
      const smallestBlob = await canvasToBlob(
        canvas,
        format,
        0.01
      );

      if (!smallestBlob) {
        throw new Error('Unable to compress image.');
      }

      finalBlob = smallestBlob;
      finalQuality = 0.01;
      break;
    }

    /*
     * Target could not be achieved even at quality 0.01.
     * Reduce dimensions while keeping the same aspect ratio.
     */
    const scale = 0.82;

    currentWidth = Math.max(
      100,
      Math.floor(currentWidth * scale)
    );

    currentHeight = Math.max(
      100,
      Math.floor(currentHeight * scale)
    );
  }

  if (!finalBlob) {
    throw new Error(
      `Unable to compress image to ${targetKb} KB.`
    );
  }

  // Use the exact Blob that was selected.
  // Do not encode the canvas again.
  const dataUrl = await readFileAsDataURL(finalBlob);

  if (onProgress) {
    onProgress(100);
  }

  return {
    blob: finalBlob,
    dataUrl,
    width: currentWidth,
    height: currentHeight,
    size: finalBlob.size,
    formattedSize: formatBytes(finalBlob.size),
    targetKb,
    achievedKb:
      Math.round((finalBlob.size / 1024) * 10) / 10,
    qualityUsed: Math.round(finalQuality * 100),
  };
}

/**
 * Trigger browser file download
 */
export function downloadBlob(blob, defaultFilename = 'resized-image.jpg') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = defaultFilename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 2000);
}
