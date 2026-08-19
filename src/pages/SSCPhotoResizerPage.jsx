import React from 'react';
import ImageToolPage from '../components/ImageToolPage.jsx';

export default function SSCPhotoResizerPage() {
    return (
        <ImageToolPage
            pageType="ssc"

            title="SSC Photo Resizer Online Free | Resize Photo for SSC Forms | ImageFix"

            description="Resize photos online for SSC applications and exam forms. Adjust image dimensions according to the required SSC photo specifications with the free ImageFix photo resizer."

            heading="Resize Photo for SSC Application Online"

            content={
                <>
                    <div>
                        <h2 className="text-2xl font-bold">
                            SSC Photo Resizer
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Prepare your photograph for SSC examination and
                            application forms by adjusting its pixel dimensions
                            online. ImageFix lets you resize your image directly
                            in your browser without installing additional software.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Check the Official SSC Photo Requirements
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Photo requirements can vary depending on the SSC
                            examination and application instructions. Before
                            uploading your photograph, check the official SSC
                            notification or application portal for the required
                            dimensions, aspect ratio, file format and file size.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            How to Resize a Photo for SSC Forms
                        </h2>

                        <ol className="mt-4 space-y-3 text-slate-600 dark:text-slate-400 list-decimal list-inside">
                            <li>Upload your photograph.</li>
                            <li>Check the required SSC photo dimensions.</li>
                            <li>Enter the required width and height.</li>
                            <li>Process the resized image.</li>
                            <li>Download the final photograph.</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Avoid Distorting Your SSC Photo
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            If the SSC application specifies a particular aspect
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
                            <a
                                href="/image-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Image Resizer
                            </a>

                            <a
                                href="/image-compressor"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Image Compressor
                            </a>

                            <a
                                href="/passport-photo-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Passport Photo Resizer
                            </a>

                            <a
                                href="/signature-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Signature Resizer
                            </a>
                            <a
                                href="/upsc-photo-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                UPSC Photo Resizer
                            </a>
                        </div>
                    </div>
                </>
            }
        />
    );
}