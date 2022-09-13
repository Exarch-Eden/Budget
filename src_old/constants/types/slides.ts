import React from "react";

export type InfoSlideType = "spend" | "all";

export interface InfoSlideData {
    type: InfoSlideType;
}

interface InfoSlideRenderFuncParams {
    item: InfoSlideData;
}

export type InfoSlideRenderFunc = (
    params: InfoSlideRenderFuncParams
) => React.ReactElement;
