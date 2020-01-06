import { useEffect, useRef } from "react";

const useDidUpdate = (callback, deps) => {
  const isInitialMount = useRef(true);
  useEffect(
    isInitialMount.current
      ? () => {
          isInitialMount.current = false;
        }
      : callback,
    deps
  );
};

export default useDidUpdate;
