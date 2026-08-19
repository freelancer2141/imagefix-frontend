import React from 'react';
import ImageToolPage from '../components/ImageToolPage.jsx';

export default function PassportPhotoResizerPage() {
    return (
        <ImageToolPage
            pageType="passport"

            title="Passport Photo Resizer Online Free | Resize Passport Photos | ImageFix"

            description="Resize passport photos online for free. Adjust image dimensions for passport, visa, ID and application forms while keeping the required pixel size and aspect ratio."

            heading="Resize Passport Photo Online"

            content={
                <>
                    <div>
                        <h2 className="text-2xl font-bold">
                            Passport Photo Resizer
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Resize passport photos online for passport, visa, ID
                            and other application forms. ImageFix lets you adjust
                            the pixel dimensions of your image directly in your
                            browser.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Check the Required Passport Photo Size
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Passport and visa photo requirements can vary depending
                            on the country, application type and issuing authority.
                            Always check the official passport or visa instructions
                            for the required width, height, aspect ratio, file format
                            and file size before uploading your photograph.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            How to Resize a Passport Photo
                        </h2>

                        <ol className="mt-4 space-y-3 text-slate-600 dark:text-slate-400 list-decimal list-inside">
                            <li>Upload your passport photograph.</li>
                            <li>Check the official required photo dimensions.</li>
                            <li>Enter the required width and height.</li>
                            <li>Process the resized image.</li>
                            <li>Download the final photograph.</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Maintain the Correct Aspect Ratio
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            If the passport or visa application specifies a
                            particular aspect ratio, use the required proportions
                            when resizing. This helps prevent the photograph from
                            appearing stretched or compressed.
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
                                href="/signature-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Signature Resizer
                            </a>

                            <a
                                href="/ssc-photo-resizer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                SSC Photo Resizer
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