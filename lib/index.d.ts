/// <reference types="react" />
export type MatrixCodeRainComponentProps = {
    width?: number | string;
    height?: number | string;
    timeout?: number;
    textStrip?: string[];
    theColors?: string[];
    stripCount?: number;
};
declare const MatrixCodeRainComponent: React.FC<MatrixCodeRainComponentProps>;
export default MatrixCodeRainComponent;
