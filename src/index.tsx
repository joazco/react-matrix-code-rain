import { useEffect, useRef } from 'react';

export type MatrixCodeRainComponentProps = {
  width?: number | string;
  height?: number | string;
  timeout?: number;
  textStrip?: string[];
  theColors?: string[];
  stripCount?: number;
};
// To disable <React.StrictMode> effect
let isDrawin = false;
const MatrixCodeRainComponent: React.FC<MatrixCodeRainComponentProps> = ({
  width,
  height,
  timeout = 70,
  textStrip = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
  theColors = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'],
  stripCount = 60,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current || isDrawin) return;
    isDrawin = true;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    const canvas = canvasRef.current;

    const stripX = new Array();
    const stripY = new Array();
    const dY = new Array();
    const stripFontSize = new Array();

    for (let i = 0; i < stripCount; i++) {
      stripX[i] = Math.floor(Math.random() * 1265);
      stripY[i] = -100;
      dY[i] = Math.floor(Math.random() * 7) + 3;
      stripFontSize[i] = Math.floor(Math.random() * 16) + 8;
    }

    const drawStrip = (x: number, y: number) => {
      for (let k = 0; k <= 20; k++) {
        const randChar = textStrip[Math.floor(Math.random() * textStrip.length)];
        if (context.fillText) {
          switch (k) {
            case 0:
              context.fillStyle = theColors[0];
              break;
            case 1:
              context.fillStyle = theColors[1];
              break;
            case 3:
              context.fillStyle = theColors[2];
              break;
            case 7:
              context.fillStyle = theColors[3];
              break;
            case 13:
              context.fillStyle = theColors[4];
              break;
            case 17:
              context.fillStyle = theColors[5];
              break;
          }
          context.fillText(randChar, x, y);
        }
        y -= stripFontSize[k];
      }
    };

    const draw = () => {
      // clear the canvas and set the properties
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.shadowOffsetX = context.shadowOffsetY = 0;
      context.shadowBlur = 8;
      context.shadowColor = '#94f475';

      for (let j = 0; j < stripCount; j++) {
        context.font = stripFontSize[j] + 'px MatrixCode';
        context.textBaseline = 'top';
        context.textAlign = 'center';

        if (stripY[j] > 1358) {
          stripX[j] = Math.floor(Math.random() * canvas.width);
          stripY[j] = -100;
          dY[j] = Math.floor(Math.random() * 7) + 3;
          stripFontSize[j] = Math.floor(Math.random() * 16) + 8;
          drawStrip(stripX[j], stripY[j]);
        } else drawStrip(stripX[j], stripY[j]);

        stripY[j] += dY[j];
      }
      setTimeout(draw, timeout);
    };
    draw();
  }, [canvasRef]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const canvasContainer = canvas.parentNode;
    if (!canvasContainer) return;
    const resizeCanvas = () => {
      if (width === undefined) {
        // @ts-ignore
        canvas.width = canvasContainer.clientWidth;
      }

      if (height === undefined) {
        // @ts-ignore
        canvas.height = canvasContainer.clientHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [width, height]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};

export default MatrixCodeRainComponent;
