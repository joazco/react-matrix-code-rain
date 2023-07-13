"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// To disable <React.StrictMode> effect
var isDrawin = false;
var MatrixCodeRainComponent = function (_a) {
    var width = _a.width, height = _a.height, _b = _a.timeout, timeout = _b === void 0 ? 70 : _b, _c = _a.textStrip, textStrip = _c === void 0 ? [
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
    ] : _c, _d = _a.theColors, theColors = _d === void 0 ? ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'] : _d, _e = _a.stripCount, stripCount = _e === void 0 ? 60 : _e;
    var canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!canvasRef.current || isDrawin)
            return;
        isDrawin = true;
        var context = canvasRef.current.getContext('2d');
        if (!context)
            return;
        var canvas = canvasRef.current;
        var stripX = new Array();
        var stripY = new Array();
        var dY = new Array();
        var stripFontSize = new Array();
        for (var i = 0; i < stripCount; i++) {
            stripX[i] = Math.floor(Math.random() * 1265);
            stripY[i] = -100;
            dY[i] = Math.floor(Math.random() * 7) + 3;
            stripFontSize[i] = Math.floor(Math.random() * 16) + 8;
        }
        var drawStrip = function (x, y) {
            for (var k = 0; k <= 20; k++) {
                var randChar = textStrip[Math.floor(Math.random() * textStrip.length)];
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
        var draw = function () {
            // clear the canvas and set the properties
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.shadowOffsetX = context.shadowOffsetY = 0;
            context.shadowBlur = 8;
            context.shadowColor = '#94f475';
            for (var j = 0; j < stripCount; j++) {
                context.font = stripFontSize[j] + 'px MatrixCode';
                context.textBaseline = 'top';
                context.textAlign = 'center';
                if (stripY[j] > 1358) {
                    stripX[j] = Math.floor(Math.random() * canvas.width);
                    stripY[j] = -100;
                    dY[j] = Math.floor(Math.random() * 7) + 3;
                    stripFontSize[j] = Math.floor(Math.random() * 16) + 8;
                    drawStrip(stripX[j], stripY[j]);
                }
                else
                    drawStrip(stripX[j], stripY[j]);
                stripY[j] += dY[j];
            }
            setTimeout(draw, timeout);
        };
        draw();
    }, [canvasRef]);
    (0, react_1.useEffect)(function () {
        if (!canvasRef.current)
            return;
        var canvas = canvasRef.current;
        var canvasContainer = canvas.parentNode;
        if (!canvasContainer)
            return;
        var resizeCanvas = function () {
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
        return function () {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [width, height]);
    return (0, jsx_runtime_1.jsx)("canvas", { width: width, height: height, ref: canvasRef });
};
exports.default = MatrixCodeRainComponent;
