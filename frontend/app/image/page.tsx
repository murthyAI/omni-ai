"use client";

import { useState } from "react";

import ImagePrompt from "@/components/image/ImagePrompt";
import LoadingAnimation from "@/components/image/LoadingAnimation";
import ImagePreview from "@/components/image/ImagePreview";
import ImageToolbar from "@/components/image/ImageToolbar";
import ImageHistory from "@/components/image/ImageHistory";

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [imageHistory, setImageHistory] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateImage = async () => {
    const cleanedPrompt = prompt.trim();

    if (!cleanedPrompt) {
      setError("Please enter an image description.");
      setGeneratedImage("");
      return;
    }

    try {
      setIsGenerating(true);
      setError("");

      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: cleanedPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Image generation failed. Please try again."
        );
      }

      const imageUrl =
        data?.imageUrl ||
        data?.url ||
        data?.image ||
        data?.result?.imageUrl ||
        data?.result?.url;

      if (!imageUrl || typeof imageUrl !== "string") {
        throw new Error("The server did not return a generated image.");
      }

      setGeneratedImage(imageUrl);

      setImageHistory((previousHistory) => {
        const updatedHistory = [
          imageUrl,
          ...previousHistory.filter((image) => image !== imageUrl),
        ];

        return updatedHistory.slice(0, 6);
      });
    } catch (caughtError) {
      const errorMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while generating the image.";

      setError(errorMessage);
      setGeneratedImage("");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectHistoryImage = (image: string) => {
    setGeneratedImage(image);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            AI Image Generator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Describe the image you want to create and let OMNI AI generate it
            for you.
          </p>
        </section>

        <div className="grid gap-7 lg:grid-cols-2">
          <ImagePrompt
            prompt={prompt}
            loading={isGenerating}
            onPromptChange={setPrompt}
            onGenerate={handleGenerateImage}
          />

          <div>
            {isGenerating ? (
              <LoadingAnimation />
            ) : (
              <ImagePreview
                imageUrl={generatedImage}
                error={error}
              />
            )}
          </div>
        </div>

        <div className="mt-7">
          <ImageToolbar
            imageUrl={generatedImage}
            loading={isGenerating}
            onRegenerate={handleGenerateImage}
          />
        </div>

        <div className="mt-7">
          <ImageHistory
            history={imageHistory}
            onSelect={handleSelectHistoryImage}
          />
        </div>
      </div>
    </main>
  );
}