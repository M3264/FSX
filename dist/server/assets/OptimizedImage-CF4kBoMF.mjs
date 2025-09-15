import React, { useState, useRef, useEffect } from "react";
const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (priority) {
      const preloadImg = new Image();
      preloadImg.src = src;
      preloadImg.onload = () => {
        setIsLoaded(true);
      };
      preloadImg.onerror = () => {
        setError(true);
      };
    }
  }, [src, priority]);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  const handleImageError = () => {
    setError(true);
  };
  return /* @__PURE__ */ React.createElement("div", { className: `relative overflow-hidden ${className}` }, !isLoaded && !error && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" }), /* @__PURE__ */ React.createElement(
    "img",
    {
      ref: imgRef,
      src,
      alt,
      width,
      height,
      loading: priority ? "eager" : "lazy",
      decoding: "async",
      className: `w-full h-full transition-opacity duration-200 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`,
      onLoad: handleImageLoad,
      onError: handleImageError,
      style: {
        // Force le navigateur à démarrer le téléchargement plus tôt
        contentVisibility: priority ? "visible" : "auto"
      }
    }
  ), error && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-800" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-400 text-sm" }, "Image indisponible")));
};
export {
  OptimizedImage as O
};
