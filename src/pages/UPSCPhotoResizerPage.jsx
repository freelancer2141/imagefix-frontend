import React from 'react';
import ImageToolPage from '../components/ImageToolPage.jsx';
import { Link } from 'react-router-dom';

export default function UPSCPhotoResizerPage() {
    return (
        <ImageToolPage
            pageType="upsc"

            title="UPSC Photo Resizer Online Free | Resize Photo for UPSC Forms | ImageFix"

            description="Resize photos online for UPSC applications and examination forms. Adjust image dimensions to the requirements specified by the official UPSC notification or application portal with ImageFix."

            heading="Resize Photo for UPSC Application Online"

            content={
                <>
                    <div>
                        <h2 className="text-2xl font-bold">
                            UPSC Photo Resizer
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Prepare your photograph for UPSC examination and
                            application forms by adjusting its pixel dimensions
                            online. ImageFix lets you resize your image directly
                            in your browser without installing additional software.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Check the Official UPSC Photo Requirements
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Photo requirements can vary depending on the UPSC
                            examination and application instructions. Before
                            uploading your photograph, check the official UPSC
                            notification or application portal for the required
                            dimensions, aspect ratio, file format and file size.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            How to Resize a Photo for UPSC Forms
                        </h2>

                        <ol className="mt-4 space-y-3 text-slate-600 dark:text-slate-400 list-decimal list-inside">
                            <li>Upload your photograph.</li>
                            <li>Check the required UPSC photo dimensions.</li>
                            <li>Enter the required width and height.</li>
                            <li>Process the resized image.</li>
                            <li>Download the final photograph.</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Avoid Distorting Your UPSC Photo
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            If the UPSC application specifies a particular aspect
                            ratio, use the required proportions when resizing.
                            Maintaining the correct proportions helps prevent the
                            photograph from appearing stretched or compressed.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Supported Image Formats
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            ImageFix supports common image formats including JPG,
                            JPEG, PNG and WebP for online image resizing.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Related Image Tools
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link
                                to="/image-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Image Resizer
                            </Link>

                            <Link
                                to="/image-compressor"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Image Compressor
                            </Link>

                            <Link
                                to="/passport-photo-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Passport Photo Resizer
                            </Link>

                            <Link
                                to="/signature-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Signature Resizer
                            </Link>

                            <Link
                                to="/ssc-photo-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                SSC Photo Resizer
                            </Link>
                        </div>
                    </div>
                </>
            }
        />
    );
}