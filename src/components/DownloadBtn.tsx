"use client";

interface Props {
  original_url: string;
  content_type: string;
}

export default function DownloadBtn({ original_url, content_type }: Props) {
  async function downloadBlob() {
    const response = await fetch(original_url);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = content_type;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
  }
  return (
    <div className="text-center pt-4">
      <button
        onClick={downloadBlob}
        className="px-4 py-1 bg-blue-500 text-white text-sm font-medium"
      >
        download
      </button>
    </div>
  );
}
