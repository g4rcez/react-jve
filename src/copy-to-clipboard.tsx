import React from "react";
import { useCallback, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
export const copyToClipboard = async (str: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(str);
  } catch (error) {
    const selected =
      document.getSelection()!.rangeCount > 0
        ? document.getSelection()!.getRangeAt(0)
        : false;
    const el = document.createElement("textarea");
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.value = str;
    el.focus();
    el.select();
    document.execCommand("copy");
    if (selected) {
      document.getSelection()!.removeAllRanges();
      document.getSelection()!.addRange(selected);
    }
    document.body.removeChild(el);
  }
};

export const ClipboardButton = ({ data }: { data: any }) => {
  const [view, setView] = useState(false);

  const onCopy = useCallback(() => {
    setView(true);
    copyToClipboard(JSON.stringify(data, null, 2));
  }, [data]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (view) {
        setView(false);
      }
    }, 2000);
    return () => clearTimeout(t);
  }, [view]);

  return view ? (
    <button disabled className="bg-transparent">
      <FiCheck />
    </button>
  ) : (
    <button onClick={onCopy}>
      <FaRegCopy />
    </button>
  );
};
