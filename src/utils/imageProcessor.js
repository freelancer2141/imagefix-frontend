
import { formatBytes } from './formatters.js';
/**
 * Utility functions for browser-based image processing using HTML5 Canvas
 */

/**
 * Format bytes to readable string (e.g., "1.82 MB", "94 KB")
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
 * Generate a sample photo or signature locally on canvas for testing
 */
export function createSampleImage(type = 'passport') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (type === 'passport') {
    // 350 x 450 px passport portrait
    canvas.width = 350;
    canvas.height = 450;

    // Light blue-gray studio background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 450);
    bgGrad.addColorStop(0, '#e2e8f0');
    bgGrad.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 350, 450);

    // Shoulders / suit
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.ellipse(175, 450, 140, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shirt collar
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(150, 350);
    ctx.lineTo(175, 390);
    ctx.lineTo(200, 350);
    ctx.closePath();
    ctx.fill();

    // Neck
    ctx.fillStyle = '#f6d8b8';
    ctx.fillRect(155, 270, 40, 75);

    // Head
    ctx.fillStyle = '#fcd5b5';
    ctx.beginPath();
    ctx.ellipse(175, 220, 65, 80, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(175, 200, 70, Math.PI, Math.PI * 2);
    ctx.fill();

    // Eyes & Smile
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(155, 220, 5, 0, Math.PI * 2);
    ctx.arc(195, 220, 5, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(175, 250, 18, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();

    // Badge text
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SAMPLE PASSPORT PHOTO', 175, 30);
  } else {
    // 400 x 150 px signature
    canvas.width = 400;
    canvas.height = 150;

    // Pure white paper background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 150);

    // Signature stroke (navy ink)
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(50, 85);
    ctx.bezierCurveTo(80, 30, 120, 120, 160, 60);
    ctx.bezierCurveTo(180, 40, 200, 100, 240, 75);
    ctx.bezierCurveTo(270, 60, 300, 95, 350, 70);
    ctx.stroke();

    // Underline
    ctx.beginPath();
    ctx.moveTo(60, 110);
    ctx.lineTo(340, 105);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SAMPLE SIGNATURE SPECIMEN', 200, 138);
  }

  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  const img = new Image();
  img.src = dataUrl;

  return {
    name: type === 'passport' ? 'sample-passport-photo.jpg' : 'sample-signature.jpg',
    type: 'image/jpeg',
    size: type === 'passport' ? 245 * 1024 : 68 * 1024,
    formattedSize: type === 'passport' ? '245 KB' : '68 KB',
    width: canvas.width,
    height: canvas.height,
    aspectRatio: canvas.width / canvas.height,
    imageElement: img,
    dataUrl,
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

  const dataUrl = canvas.toDataURL(format, quality);

  return {
    blob,
    dataUrl,
    width: canvas.width,
    height: canvas.height,
    size: blob.size,
    formattedSize: formatBytes(blob.size),
  };
}

/**
 * Smart Compress image to target KB size
 * Compresses file size (bytes) via encoder quantization while strictly preserving 100% of original pixel resolution and dimensions.
 */
// export async function compressImageToTargetSize({
//   image,
//   targetKb,
//   initialWidth,
//   initialHeight,
//   format = 'image/jpeg',
//   preserveExactDimensions = true,
//   onProgress,
// }) {
//   const targetBytes = targetKb * 1024;
//   const loadedImg = await loadImage(image);
//   const srcWidth = Math.round(initialWidth || loadedImg.naturalWidth || loadedImg.width || 800);
//   const srcHeight = Math.round(initialHeight || loadedImg.naturalHeight || loadedImg.height || 600);

//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   if (!ctx) throw new Error('Canvas 2D context not supported.');

//   // Strictly preserve the exact 100% original pixel resolution (no downsampling, no scaling down)
//   canvas.width = srcWidth;
//   canvas.height = srcHeight;

//   if (format === 'image/jpeg' || format === 'image/jpg') {
//     ctx.fillStyle = '#ffffff';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//   }

//   ctx.imageSmoothingEnabled = true;
//   ctx.imageSmoothingQuality = 'high';
//   ctx.drawImage(loadedImg, 0, 0, srcWidth, srcHeight);

//   let minQuality = 0.01;
//   let maxQuality = 0.99;
//   let bestBlob = null;
//   let bestQuality = 0.85;

//   // High precision binary search on quality while strictly preserving exact dimensions
//   for (let step = 0; step < 16; step++) {
//     if (onProgress) onProgress(Math.round(((step + 1) / 16) * 100));

//     const midQuality = (minQuality + maxQuality) / 2;
//     const blob = await canvasToBlob(canvas, format, midQuality);

//     if (!blob) break;

//     if (blob.size <= targetBytes) {
//       bestBlob = blob;
//       bestQuality = midQuality;
//       minQuality = midQuality; // Try higher quality to get closer to target
//     } else {
//       maxQuality = midQuality; // Need more compression (lower quality)
//     }

//     // If we hit within 4% of target limit, we found optimal quality
//     if (blob.size <= targetBytes && blob.size >= targetBytes * 0.96) {
//       bestBlob = blob;
//       bestQuality = midQuality;
//       break;
//     }
//   }

//   // Fallback: If image at minQuality was still above target or no blob found
//   if (!bestBlob) {
//     bestBlob = await canvasToBlob(canvas, format, minQuality);
//     bestQuality = minQuality;
//   }

//   const bestDataUrl = canvas.toDataURL(format, bestQuality);

//   if (onProgress) onProgress(100);

//   return {
//     blob: bestBlob,
//     dataUrl: bestDataUrl,
//     width: srcWidth,
//     height: srcHeight,
//     size: bestBlob ? bestBlob.size : targetBytes,
//     formattedSize: formatBytes(bestBlob ? bestBlob.size : targetBytes),
//     targetKb,
//     achievedKb: Math.round(((bestBlob ? bestBlob.size : targetBytes) / 1024) * 10) / 10,
//     qualityUsed: Math.round(bestQuality * 100),
//   };
// }

export async function compressImageToTargetSize({
  image,
  targetKb,
  initialWidth,
  initialHeight,
  format = 'image/jpeg',
  preserveExactDimensions = true,
  onProgress,
}) {
  const targetBytes = Math.floor(targetKb * 1024);

  const loadedImg = await loadImage(image);

  const srcWidth = Math.round(
    initialWidth || loadedImg.naturalWidth || loadedImg.width || 800
  );

  const srcHeight = Math.round(
    initialHeight || loadedImg.naturalHeight || loadedImg.height || 600
  );

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not supported.');
  }

  canvas.width = srcWidth;
  canvas.height = srcHeight;

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
    srcWidth,
    srcHeight
  );

  let low = 0.01;
  let high = 0.99;

  let bestBlob = null;
  let bestQuality = 0.01;

  // First check maximum quality
  const maxBlob = await canvasToBlob(canvas, format, high);

  if (!maxBlob) {
    throw new Error('Failed to generate compressed image.');
  }

  // Already below target at high quality
  if (maxBlob.size <= targetBytes) {
    bestBlob = maxBlob;
    bestQuality = high;
  } else {
    // Binary search for highest quality that stays <= target
    for (let step = 0; step < 20; step++) {
      const quality = (low + high) / 2;

      const blob = await canvasToBlob(
        canvas,
        format,
        quality
      );

      if (!blob) continue;

      if (onProgress) {
        onProgress(Math.min(95, Math.round(((step + 1) / 20) * 95)));
      }

      if (blob.size <= targetBytes) {
        // Valid result — save it and try higher quality
        bestBlob = blob;
        bestQuality = quality;
        low = quality;
      } else {
        // Too large — reduce quality
        high = quality;
      }
    }
  }

  // If target cannot be reached at current dimensions,
  // use the lowest quality available.
  if (!bestBlob) {
    const smallestBlob = await canvasToBlob(
      canvas,
      format,
      0.01
    );

    if (!smallestBlob) {
      throw new Error('Unable to compress image to the requested size.');
    }

    bestBlob = smallestBlob;
    bestQuality = 0.01;
  }

  /*
   * IMPORTANT:
   * Use the exact blob we selected.
   * Do NOT call canvas.toDataURL() again because that
   * performs another JPEG encoding and can produce a
   * different file size.
   */
  const dataUrl = await readFileAsDataURL(bestBlob);

  if (onProgress) {
    onProgress(100);
  }

  return {
    blob: bestBlob,
    dataUrl,
    width: srcWidth,
    height: srcHeight,
    size: bestBlob.size,
    formattedSize: formatBytes(bestBlob.size),
    targetKb,
    achievedKb:
      Math.round((bestBlob.size / 1024) * 10) / 10,
    qualityUsed: Math.round(bestQuality * 100),
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
