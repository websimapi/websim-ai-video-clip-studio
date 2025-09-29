import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring
} from "remotion";
const VideoComposition = ({
  title,
  script,
  backgroundImage,
  audioUrl,
  style
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const titleScale = spring({
    fps,
    frame,
    config: { damping: 200 }
  });
  const subtitleDelay = 60;
  const subtitleOpacity = interpolate(frame, [subtitleDelay, subtitleDelay + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: [
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: [
      /* @__PURE__ */ jsxDEV(
        Img,
        {
          src: backgroundImage,
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 44,
          columnNumber: 17
        }
      ),
      /* @__PURE__ */ jsxDEV(
        AbsoluteFill,
        {
          style: {
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 53,
          columnNumber: 17
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 13
    }),
    audioUrl && /* @__PURE__ */ jsxDEV(Audio, { src: audioUrl }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 62,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          textAlign: "center"
        },
        children: [
          /* @__PURE__ */ jsxDEV(
            "h1",
            {
              style: {
                fontSize: "3.5rem",
                fontWeight: "bold",
                color: "white",
                textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                opacity: titleOpacity,
                transform: `scale(${0.8 + titleScale * 0.2})`,
                lineHeight: "1.2",
                marginBottom: "20px"
              },
              children: title
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 74,
              columnNumber: 17
            }
          ),
          /* @__PURE__ */ jsxDEV(
            "p",
            {
              style: {
                fontSize: "1.8rem",
                color: "white",
                textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                opacity: subtitleOpacity,
                maxWidth: "80%",
                lineHeight: "1.4",
                fontWeight: "300"
              },
              children: script
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 89,
              columnNumber: 17
            }
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 66,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          pointerEvents: "none"
        },
        children: style.toLowerCase().includes("epic") && /* @__PURE__ */ jsxDEV(
          "div",
          {
            style: {
              position: "absolute",
              top: "20px",
              left: "20px",
              right: "20px",
              height: "4px",
              background: "linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1)",
              borderRadius: "2px",
              opacity: interpolate(frame, [90, 120], [0, 0.8], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp"
              })
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 111,
            columnNumber: 21
          }
        )
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 41,
    columnNumber: 9
  });
};
export {
  VideoComposition
};
