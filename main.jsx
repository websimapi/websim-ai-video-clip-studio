import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ClipGenerator } from "./ClipGenerator.jsx";
import { ClipGallery } from "./ClipGallery.jsx";
const room = new WebsimSocket();
const App = () => {
  const [activeTab, setActiveTab] = useState("generator");
  const [clips, setClips] = useState([]);
  const clipsCollection = React.useSyncExternalStore(
    room.collection("clip").subscribe,
    room.collection("clip").getList
  );
  useEffect(() => {
    setClips(clipsCollection.reverse());
  }, [clipsCollection]);
  return /* @__PURE__ */ jsxDEV("div", { className: "app", children: [
    /* @__PURE__ */ jsxDEV("header", { className: "header", children: [
      /* @__PURE__ */ jsxDEV("h1", { children: "\u{1F3AC} AI Video Clip Studio" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 24,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("nav", { className: "nav-tabs", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            className: `tab ${activeTab === "generator" ? "active" : ""}`,
            onClick: () => setActiveTab("generator"),
            children: "\u2728 Create Clip"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 26,
            columnNumber: 21
          }
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            className: `tab ${activeTab === "gallery" ? "active" : ""}`,
            onClick: () => setActiveTab("gallery"),
            children: [
              "\u{1F3A5} Gallery (",
              clips.length,
              ")"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 32,
            columnNumber: 21
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 23,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("main", { className: "main-content", children: [
      activeTab === "generator" && /* @__PURE__ */ jsxDEV(ClipGenerator, { room }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 42,
        columnNumber: 47
      }),
      activeTab === "gallery" && /* @__PURE__ */ jsxDEV(ClipGallery, { clips, room }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 43,
        columnNumber: 45
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 41,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 22,
    columnNumber: 9
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 49,
  columnNumber: 51
}));
