import React from 'react';
import ImageToolPage from '../components/ImageToolPage.jsx';

export default function SignatureResizerPage() {
    return (
        <ImageToolPage
            pageType="signature"

            title="Free Signature Resizer Online | Resize Signature for Forms | ImageFix"

            description="Resize your signature image online for government forms, exams, job applications and other online applications. Adjust signature dimensions easily with ImageFix."

            heading="Resize Signature Online"

            content={
                <>
                    <div>
                        <h2 className="text-2xl font-bold">
                            Signature Resizer for Online Forms
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Resize your signature image for government forms,
                            examinations, job applications and other online
                            application portals. ImageFix lets you adjust the
                            pixel dimensions of your signature directly in
                            your browser.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Check the Required Signature Size
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Signature requirements can vary between different
                            examinations, government departments, universities
                            and application portals. Always check the official
                            instructions for the required width, height, aspect
                            ratio, file format and file size.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            How to Resize a Signature
                        </h2>

                        <ol className="mt-4 space-y-3 text-slate-600 dark:text-slate-400 list-decimal list-inside">
                            <li>Upload your signature image.</li>
                            <li>Enter the required width and height.</li>
                            <li>Process the image.</li>
                            <li>Download the resized signature.</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Avoid Stretching or Distorting Your Signature
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            If an application specifies a particular aspect
                            ratio, use the required proportions when resizing.
                            This helps prevent the signature from appearing
                            stretched or compressed.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Supported Image Formats
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            ImageFix supports common image formats including
                            JPG, JPEG, PNG and WebP.
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
                        </div>
                    </div>
                </>
            }
        />
    );
}