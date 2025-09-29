import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { Player } from "@websim/remotion/player";
import { VideoComposition } from "./VideoComposition.jsx";
const ClipGenerator = ({ room }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const generateClip = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const scriptResponse = await websim.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a creative video director. Create engaging video content based on user prompts.
                        Respond with JSON in this format:
                        {
                            "title": "string",
                            "script": "string (2-3 sentences max for TTS)",
                            "visualPrompt": "string (detailed image generation prompt)",
                            "style": "string (video style/mood)",
                            "duration": number (duration in seconds, 3-10)
                        }`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        json: true
      });
      const scriptData = JSON.parse(scriptResponse.content);
      const imageResult = await websim.imageGen({
        prompt: scriptData.visualPrompt,
        aspect_ratio: "9:16"
      });
      const audioResult = await websim.textToSpeech({
        text: scriptData.script,
        voice: "en-female"
      });
      const content = {
        ...scriptData,
        backgroundImage: imageResult.url,
        audioUrl: audioResult.url,
        durationInFrames: Math.round(scriptData.duration * 30)
        // 30 FPS
      };
      setGeneratedContent(content);
      setShowPreview(true);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate clip. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  const saveClip = async () => {
    if (!generatedContent) return;
    try {
      await room.collection("clip").create({
        title: generatedContent.title,
        prompt,
        script: generatedContent.script,
        visualPrompt: generatedContent.visualPrompt,
        style: generatedContent.style,
        duration: generatedContent.duration,
        backgroundImage: generatedContent.backgroundImage,
        audioUrl: generatedContent.audioUrl,
        durationInFrames: generatedContent.durationInFrames
      });
      alert("Clip saved to gallery!");
      setPrompt("");
      setGeneratedContent(null);
      setShowPreview(false);
    } catch (error) {
      console.error("Failed to save clip:", error);
      alert("Failed to save clip.");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "clip-generator", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "generator-form", children: [
      /* @__PURE__ */ jsxDEV("h2", { children: "Create Your AI Video Clip" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 99,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "prompt", children: "Describe your video idea:" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 101,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            id: "prompt",
            value: prompt,
            onChange: (e) => setPrompt(e.target.value),
            placeholder: "e.g., A motivational speech about overcoming challenges with epic mountain scenery",
            rows: 4,
            disabled: isGenerating
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 102,
            columnNumber: 21
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 100,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: generateClip,
          disabled: isGenerating || !prompt.trim(),
          className: "generate-btn",
          children: isGenerating ? "\u{1F3AC} Generating..." : "\u2728 Generate Clip"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 112,
          columnNumber: 17
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 98,
      columnNumber: 13
    }),
    showPreview && generatedContent && /* @__PURE__ */ jsxDEV("div", { className: "preview-section", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "Preview" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 123,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "preview-container", children: /* @__PURE__ */ jsxDEV(
        Player,
        {
          component: VideoComposition,
          durationInFrames: generatedContent.durationInFrames,
          fps: 30,
          compositionWidth: 540,
          compositionHeight: 960,
          controls: true,
          loop: true,
          inputProps: generatedContent,
          style: {
            maxWidth: "320px",
            maxHeight: "568px",
            border: "2px solid #333",
            borderRadius: "12px",
            overflow: "hidden"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 125,
          columnNumber: 25
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 124,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "clip-details", children: [
        /* @__PURE__ */ jsxDEV("h4", { children: generatedContent.title }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 145,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Script:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 146,
            columnNumber: 28
          }),
          ' "',
          generatedContent.script,
          '"'
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 146,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Style:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 147,
            columnNumber: 28
          }),
          " ",
          generatedContent.style
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 147,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Duration:" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 148,
            columnNumber: 28
          }),
          " ",
          generatedContent.duration,
          "s"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 148,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 144,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "action-buttons", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: saveClip, className: "save-btn", children: "\u{1F4BE} Save to Gallery" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 152,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setShowPreview(false),
            className: "cancel-btn",
            children: "\u{1F504} Generate Another"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 155,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 151,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 122,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 97,
    columnNumber: 9
  });
};
export {
  ClipGenerator
};
