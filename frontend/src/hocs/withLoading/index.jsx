// libs
import React, { useEffect, useState } from "react";
import classnames from "classnames";
// components
import PureLoader from "@/components/PureLoader";
// hooks
import { useDelayRender } from "@/hooks";
// others
import "./styles.scss";

const withLoading = isLoading => WrappedComponent => {
  const [isMounted, setMounted] = useState(false);
  const isDelayed = useDelayRender();
  const isLoadingOrDelayed = isLoading || isDelayed;

  useEffect(() => {
    if (!isMounted && !isLoadingOrDelayed) {
      setMounted(true);
    }
  }, [isLoadingOrDelayed, isMounted]);

  return (
    <div className="loading-wrapper">
      {isMounted && (
        <div className="loading-background-wrapper">{WrappedComponent}</div>
      )}
      {isLoadingOrDelayed && (
        <div
          className={classnames("loading-layer-wrapper", {
            hasLayerBackground: isMounted
          })}
        >
          <PureLoader />
        </div>
      )}
    </div>
  );
};

export default withLoading;
