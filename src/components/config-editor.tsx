import { client } from "@/common/trpc/client";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";

export default function ConfigEditor({ configId }: { configId: string }) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | undefined>(undefined);
  const [config, setConfig] = useState<string>("");

  useEffect(() => {
    client.config.get.query({ id: [configId] }).then((configs) => {
      if (configs.length > 0) setConfig(configs[0].data);
    });
  }, [configId]);

  return (
    <>
      {/* TODO: Create custom theme for the Monaco Editor with the app theme */}
      <Editor
        height="75vh"
        defaultLanguage="json"
        theme="vs-dark"
        value={config}
        onMount={(editor, _) => (editorRef.current = editor)}
      />
    </>
  );
}
