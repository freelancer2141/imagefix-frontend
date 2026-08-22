import React, { useState } from 'react';
import ImageUploader from './ImageUploader.jsx';
import ResizeTool from './ResizeTool.jsx';
import CompressTool from './CompressTool.jsx';
import ResultCard from './ResultCard.jsx';
import SEO from './SEO.jsx';
import HeroSection from './HeroSection.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function ImageToolPage({
    pageType,
    toolType = 'resize',
    targetKb = null,
    title,
    description,
    heading,
    content,
}) {
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
                title={title}
                description={description}
            />

            <div className="min-h-screen bg-slate-50/80 dark:bg-[#090d16] text-slate-900 dark:text-slate-100">
                <Header activeNav={toolType} />

                <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">

                    <HeroSection pageType={pageType} />

                    <section
                        aria-labelledby={`${pageType}-tool-heading`}
                        className="mb-16"
                    >
                        <h2
                            id={`${pageType}-tool-heading`}
                            className="text-2xl font-bold mb-6"
                        >
                            {heading}
                        </h2>

                        {processedResult ? (
                            <ResultCard
                                result={processedResult}
                                onReset={handleReset}
                                onContinueWithImage={() => {
                                    setProcessedResult(null);
                                }}
                            />
                        ) : (
                            <div className="w-full bg-white dark:bg-slate-900/90 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-black/50 border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row min-h-[480px]">

                                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center items-center bg-slate-50/70 dark:bg-[#0c1220] border-b md:border-b-0 md:border-r border-slate-200/60 dark:border-slate-800/80">

                                    <ImageUploader
                                        imageMeta={imageMeta}
                                        setImageMeta={(meta) => {
                                            setImageMeta(meta);
                                            setProcessedResult(null);
                                            setError(null);
                                        }}
                                        onReset={handleReset}
                                        error={error}
                                        setError={setError}
                                    />

                                </div>

                                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900/90">

                                    {toolType === 'resize' ? (
                                        <ResizeTool
                                            imageMeta={imageMeta}
                                            onProcessComplete={(result) => {
                                                setProcessedResult(result);
                                            }}
                                            isProcessing={isProcessing}
                                            setIsProcessing={setIsProcessing}
                                        />
                                    ) : (
                                        <CompressTool
                                            imageMeta={imageMeta}
                                            initialTargetKb={targetKb}
                                            onProcessComplete={(result) => {
                                                setProcessedResult(result);
                                            }}
                                            isProcessing={isProcessing}
                                            setIsProcessing={setIsProcessing}
                                        />
                                    )}

                                </div>

                            </div>
                        )}
                    </section>

                    <section className="space-y-10">
                        {content}
                    </section>

                </main>
            </div>

            <Footer />
        </>
    );
}