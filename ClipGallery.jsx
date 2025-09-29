import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { Player } from "@websim/remotion/player";
import { VideoComposition } from "./VideoComposition.jsx";
const ClipGallery = ({ clips, room }) => {
  const [selectedClip, setSelectedClip] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  React.useEffect(() => {
    const loadUser = async () => {
      const user = await window.websim.getCurrentUser();
      setCurrentUser(user);
    };
    loadUser();
  }, []);
  const deleteClip = async (clipId) => {
    if (confirm("Are you sure you want to delete this clip?")) {
      try {
        await room.collection("clip").delete(clipId);
      } catch (error) {
        console.error("Failed to delete clip:", error);
        alert("Failed to delete clip. You can only delete your own clips.");
      }
    }
  };
  const shareClip = (clip) => {
    const shareUrl = `${window.baseUrl}?clip=${clip.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Share link copied to clipboard!");
  };
  if (clips.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "empty-gallery", children: [
      /* @__PURE__ */ jsxDEV("h2", { children: "\u{1F3AC} No clips yet" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { children: "Create your first AI-generated video clip!" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 38,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 36,
      columnNumber: 13
    });
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "clip-gallery", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "gallery-grid", children: clips.map((clip) => /* @__PURE__ */ jsxDEV("div", { className: "clip-card", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "clip-thumbnail", children: [
        /* @__PURE__ */ jsxDEV(
          "img",
          {
            src: clip.backgroundImage,
            alt: clip.title,
            onClick: () => setSelectedClip(clip)
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 49,
            columnNumber: 29
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "clip-overlay", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            className: "play-btn",
            onClick: () => setSelectedClip(clip),
            children: "\u25B6\uFE0F"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 55,
            columnNumber: 33
          }
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 54,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 48,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "clip-info", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: clip.title }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 65,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "clip-meta", children: [
          "By @",
          clip.username,
          " \u2022 ",
          clip.duration,
          "s"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 66,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "clip-script", children: [
          '"',
          clip.script,
          '"'
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 69,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 64,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "clip-actions", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => shareClip(clip),
            className: "action-btn",
            title: "Share",
            children: "\u{1F517}"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 73,
            columnNumber: 29
          }
        ),
        currentUser && currentUser.username === clip.username && /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => deleteClip(clip.id),
            className: "action-btn delete-btn",
            title: "Delete",
            children: "\u{1F5D1}\uFE0F"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 81,
            columnNumber: 33
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 72,
        columnNumber: 25
      })
    ] }, clip.id, true, {
      fileName: "<stdin>",
      lineNumber: 47,
      columnNumber: 21
    })) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 45,
      columnNumber: 13
    }),
    selectedClip && /* @__PURE__ */ jsxDEV("div", { className: "modal-overlay", onClick: () => setSelectedClip(null), children: /* @__PURE__ */ jsxDEV("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          className: "close-btn",
          onClick: () => setSelectedClip(null),
          children: "\u2715"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 97,
          columnNumber: 25
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "modal-player", children: /* @__PURE__ */ jsxDEV(
        Player,
        {
          component: VideoComposition,
          durationInFrames: selectedClip.durationInFrames,
          fps: 30,
          compositionWidth: 540,
          compositionHeight: 960,
          controls: true,
          autoplay: true,
          inputProps: selectedClip,
          style: {
            maxWidth: "100%",
            maxHeight: "80vh",
            borderRadius: "12px",
            overflow: "hidden"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 105,
          columnNumber: 29
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "modal-details", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: selectedClip.title }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 124,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Creator:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 125,
            columnNumber: 32
          }),
          " @",
          selectedClip.username
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 125,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Original Prompt:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 126,
            columnNumber: 32
          }),
          " ",
          selectedClip.prompt
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 126,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Script:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 127,
            columnNumber: 32
          }),
          ' "',
          selectedClip.script,
          '"'
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 127,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Style:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 128,
            columnNumber: 32
          }),
          " ",
          selectedClip.style
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 128,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 123,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 96,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 95,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 44,
    columnNumber: 9
  });
};
export {
  ClipGallery
};
