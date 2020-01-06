import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    innerWidth: null,
    innerHeight: null,
    outerWidth: null,
    outerHeight: null
  });

  function getWindowSize() {
    setWindowSize({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight
    });
  }

  // Excuted once only during mounting
  useEffect(() => {
    getWindowSize();
  }, []);

  // Bind to window resize event and clean up binding after unmounting
  useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
