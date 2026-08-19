import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ImageUploader from '../components/ImageUploader.jsx';
import ResizeTool from '../components/ResizeTool.jsx';
import ResultCard from '../components/ResultCard.jsx';
import SEO from '../components/SEO.jsx';
import HeroSection from '../components/HeroSection.jsx';

export default function PassportPhotoPage() {
    const [imageMeta, setImageMeta] = useState(null);
    const [processedResult, setProcessedResult] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleReset = () => {
        setImageMeta(null);
        setProcessedResult(null);
        setError(null);
    };

    return (
        <>
            <SEO
                title="Free Passport Photo Resizer Online — Resize Passport Photos | ImageFix"
                description="Resize passport photos online to the required pixel dimensions for passport, visa, government forms, exams and job applications. Free passport photo resizer by ImageFix."
            />

            <div className="min-h-screen bg-slate-50/80 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col">

                <Header activeNav="resize" />

                <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-24 pb-16">

                    <HeroSection
                        pageType="resize"
                    />

                    <section className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Resize Passport Photo Online
                        </h2>

                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                            Resize your passport photo to the required width and height
                            for passport, visa, government forms, exams and job applications.
                        </p>
                    </section>

                    <section>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            <ImageUploader
                                onImageSelect={setImageMeta}
                                imageMeta={imageMeta}
                            />

                            <ResizeTool
                                imageMeta={imageMeta}
                                onProcessComplete={setProcessedResult}
                                isProcessing={isProcessing}
                                setIsProcessing={setIsProcessing}
                            />

                        </div>

                        {error && (
                            <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300">
                                {error}
                            </div>
                        )}

                        {processedResult && (
                            <div className="mt-8">
                                <ResultCard
                                    result={processedResult}
                                    onReset={handleReset}
                                />
                            </div>
                        )}
                    </section>

                    <section className="mt-12 max-w-3xl">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Passport Photo Resizing Made Easy
                        </h2>

                        <p className="text-sm sm:text-base leading-7 text-slate-600 dark:text-slate-400">
                            Upload your photo and resize it to the required dimensions
                            without installing any software. ImageFix lets you prepare
                            photos for passport, visa, examination and online application
                            forms directly in your browser.
                        </p>
                    </section>

                </main>

                <Footer />
            </div>
        </>
    );
}