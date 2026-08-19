import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import HomePage from '../pages/HomePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import ImageResizerPage from '../pages/ImageResizerPage.jsx';
import ImageCompressorPage from '../pages/ImageCompressorPage.jsx';
import CompressImageTargetPage from '../pages/CompressImageTargetPage.jsx';
import PassportPhotoResizerPage from '../pages/PassportPhotoResizerPage.jsx';
import SignatureResizerPage from '../pages/SignatureResizerPage.jsx';
import SSCPhotoResizerPage from '../pages/SSCPhotoResizerPage.jsx';
import UPSCPhotoResizerPage from '../pages/UPSCPhotoResizerPage.jsx';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Image Resizer */}
        <Route
          path="/image-resizer"
          element={<ImageResizerPage />}
        />

        {/* Image Compressor */}
        <Route
          path="/image-compressor"
          element={<ImageCompressorPage />}
        />

        {/* Target KB Compression */}
        <Route
          path="/compress-image-to-20kb"
          element={<CompressImageTargetPage targetKb={20} />}
        />

        <Route
          path="/compress-image-to-50kb"
          element={<CompressImageTargetPage targetKb={50} />}
        />

        <Route
          path="/compress-image-to-100kb"
          element={<CompressImageTargetPage targetKb={100} />}
        />

        {/* Photo Resizers */}
        <Route
          path="/passport-photo-resizer"
          element={<PassportPhotoResizerPage />}
        />

        <Route
          path="/signature-resizer"
          element={<SignatureResizerPage />}
        />

        <Route
          path="/ssc-photo-resizer"
          element={<SSCPhotoResizerPage />}
        />

        <Route
          path="/upsc-photo-resizer"
          element={<UPSCPhotoResizerPage />}
        />

        {/* 404 */}
        <Route
          path="/404"
          element={<NotFoundPage />}
        />

        {/* Unknown URLs */}
        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}