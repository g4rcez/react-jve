import React from "react";
import { Fragment, useCallback, useRef } from "react";
import { assocPath } from "ramda";

const isValidDate = (d: Date) => d instanceof Date && !isNaN(+d);

type Props<T> = {
  view: boolean;
  path: (string | number)[];
  onCreate: () => void;
  onChange: (t: T) => void;
  source: T;
  length?: number;
  isArray?: boolean;
};

const buttonClassName =
  "border cursor-pointer px-2 py-0 rounded-md text-sm outline-none";
export const AddNodeForm = <T,>({ onChange, onCreate, ...props }: Props<T>) => {
  const span = useRef<HTMLSpanElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const onCreateProp = useCallback(
    (type: "literal" | "string") => () => {
      const key = span.current?.innerText!;
      const textArea = textarea.current!.value;
      const newPath: any = props.isArray
        ? [...props.path, props.length]
        : [...props.path, key];
      if (type === "string") {
        const newObj: T = assocPath(newPath, textArea, props.source) as any;
        onChange?.(newObj);
      }
      if (type === "literal") {
        try {
          const json = JSON.parse(textArea);
          const newObj: T = assocPath(newPath, json, props.source) as any;
          onChange?.(newObj);
        } catch (error) {
          const date = new Date(textArea);
          if (isValidDate(date)) {
            const newObj: T = assocPath(newPath, date, props.source) as any;
            onChange?.(newObj);
          }
        }
      }
      onCreate();
    },
    [props.path, onCreate, props.isArray, props.length, props.source, onChange]
  );

  const valueNow = useCallback(() => {
    textarea.current!.value = new Date().toISOString();
  }, []);

  if (!props.view) {
    return null;
  }

  return (
    <div className="flex items-start ml-6">
      {props.isArray !== true && (
        <Fragment>
          <span
            className="border rounded w-auto p-1"
            contentEditable
            ref={span}
            role="textbox"
          />
          <span className="mx-2">:</span>
        </Fragment>
      )}
      <textarea
        id="value"
        name="value"
        ref={textarea}
        className="border rounded resize-none mx-2"
      />
      <div className="flex flex-col">
        <button onClick={valueNow} className={`${buttonClassName} mb-2`}>
          Date.now
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={onCreateProp("string")}
          className={`${buttonClassName} mb-2`}
        >
          Create string
        </button>
        <button onClick={onCreateProp("literal")} className={buttonClassName}>
          Create typed
        </button>
      </div>
    </div>
  );
};
