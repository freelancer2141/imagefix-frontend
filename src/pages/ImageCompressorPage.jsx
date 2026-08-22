import React from 'react';
import { Link } from 'react-router-dom';
import ImageToolPage from '../components/ImageToolPage.jsx';

export default function ImageCompressorPage() {
    return (
        <ImageToolPage
            pageType="compress"
            toolType="compress"

            title="Free Online Image Compressor — Compress Images to KB | ImageFix"

            description="Compress images online to specific KB sizes such as 20KB, 50KB, 100KB and 200KB. Reduce image file size for SSC, UPSC, IBPS, passport, visa and job application forms."

            heading="Compress Your Image Online"

            content={
                <>
                    <div>
                        <h2 className="text-2xl font-bold">
                            Compress Images to a Specific KB Size
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Many online application forms require photographs and
                            signatures to stay below a specific file size. ImageFix
                            lets you compress images toward common target sizes such as
                            20KB, 50KB, 100KB and 200KB while keeping the image
                            dimensions unchanged.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Popular Image Compression Sizes
                        </h2>

                        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400 list-disc list-inside">
                            <li>
                                <Link
                                    to="/compress-image-to-20kb"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    Compress image to 20KB
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/compress-image-to-50kb"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    Compress image to 50KB
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/compress-image-to-100kb"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    Compress image to 100KB
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Image Compressor for Online Forms
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Image compression is commonly required for government
                            examination forms, recruitment applications, passport
                            and visa applications, university forms and other
                            online registration portals.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Supported Image Formats
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Upload common image formats including JPG, JPEG, PNG
                            and WebP. Select an image from your device or use the
                            drag-and-drop upload area.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Why Use ImageFix Image Compressor?
                        </h2>

                        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400 list-disc list-inside">
                            <li>Compress images to a specific KB target</li>
                            <li>Quick presets for common file-size limits</li>
                            <li>Preserve the original image dimensions</li>
                            <li>No account required</li>
                            <li>Simple browser-based image processing</li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}