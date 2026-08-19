import React from 'react';
import ImageToolPage from '../components/ImageToolPage.jsx';

export default function ImageResizerPage() {
    return (
        <ImageToolPage
            pageType="resize"

            title="Free Online Image Resizer — Resize Images to Exact Pixels | ImageFix"

            description="Resize images online to exact pixel dimensions for SSC, UPSC, IBPS, Railways, passport, visa and job application forms. Free online image resizer by ImageFix."

            heading="Resize Your Image Online"

            content={
                <>
                    <div>
                        <h2 className="text-2xl font-bold">
                            Resize Images for Online Forms
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Many government examinations, passport applications,
                            visa applications and job portals require photographs
                            and signatures to meet specific pixel dimensions.
                            ImageFix lets you resize your image to the required
                            width and height directly in your browser.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Resize Photos to Exact Dimensions
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            Enter your required width and height in pixels, choose
                            a suitable preset, and process your image. You can also
                            maintain the original aspect ratio when needed.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Supported Image Formats
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            ImageFix supports common image formats including JPG,
                            JPEG, PNG and WebP. Images can be selected from your
                            device or dragged directly into the upload area.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Common Uses for Image Resizing
                        </h2>

                        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400 list-disc list-inside">
                            <li>SSC and UPSC application photographs</li>
                            <li>IBPS and banking examination forms</li>
                            <li>Railway recruitment applications</li>
                            <li>Passport and visa photographs</li>
                            <li>Job application profile photos</li>
                            <li>University and entrance examination forms</li>
                            <li>Digital signatures and identification documents</li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}