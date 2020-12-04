import { assocPath, dissocPath } from "ramda";
import React, { Fragment, useCallback, useEffect, useMemo, DependencyList, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { ClipboardButton } from "./copy-to-clipboard";
import { CommonProps, conversionMap, Type } from "./types";

type ClassArray = ClassValue[];

type ClassDictionary = { [id: string]: any };

export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;

const words = (s: string | number) => `${s}`.split(" ");

const classNames = (...classes: ClassValue[]): string => {
  if (classes.length === 0) {
    return "";
  }
  const array: string[] = [];
  classes.forEach((c) => {
    const type = typeof c;
    if (type === "string" || type === "number") {
      return words(c as string).forEach((s) => array.push(s));
    }
    if (type === "object") {
      for (const key in c as any) {
        if ((c as any)[key]) {
          words(key).forEach((s) => array.push(s));
        }
      }
    }
    if (Array.isArray(c)) {
      c.forEach((x) => array.push(classNames(x)));
    }
  });
  return Array.from(new Set(array)).join(" ");
};
export const useClassNames = (dependency: DependencyList, ...classes: ClassValue[]) => {
  const className = useMemo(() => classNames(...classes), dependency);
  return className;
};

const InlineValues = [Type.Null, Type.Num, Type.Str, Type.Undefined, Type.Date, Type.Regex];

type Container<T> = CommonProps<T> & {
  containerClassName?: string;
  children: React.ReactNode;
  onChange?: (a: any) => any;
};

export function ValueContainer<T>({ onChange, ...props }: Container<T>) {
  const isInline = useMemo(() => InlineValues.includes(props.type), [props.type]);

  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(props.data);

  useEffect(() => {
    setNewValue(props.data);
  }, [props.data]);

  const toggle = useCallback(() => {
    setEditMode((p) => !p);
    setNewValue(props.data);
  }, [props.data]);

  const containerClassName = useClassNames(
    [props.containerClassName, props.arrayItem],
    { "flex-col": isInline },
    "inline-block relative text-left tabular-nums antialiased align-start tabular-nums justify-start",
    props.containerClassName
  );

  const textAreaClassName = useClassNames(
    [isInline],
    {
      "resize-none": isInline
    },
    "absolute top-0 jv-editor-textarea text-green-500 p-1 border-sm z-10 outline-none"
  );

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const convertedValue = conversionMap[props.type](value, Number.isInteger(value));
      setNewValue(convertedValue);
      setEditMode(false);
      const newObj = assocPath(props.path, convertedValue, props.source);
      onChange?.(newObj);
    },
    [props.type, props.source, props.path, onChange]
  );

  const onDeletePath = useCallback(() => {
    const newObj = dissocPath(props.path, props.source);
    onChange?.(newObj);
  }, [props.source, props.path, onChange]);

  return (
    <div className={containerClassName}>
      {props.arrayItem && <span className="jv-array-count">{props.index}</span>}
      {!editMode && (
        <Fragment>
          <span onClick={toggle} role="button">
            {props.children}
          </span>
          <div className="inline-flex ml-4 hover:opacity-100 opacity-10 cursor-pointer transition-all">
            <div className="grid grid-cols-3 text-xs gap-x-2">
              <ClipboardButton data={props.data} />
              <button onClick={toggle}>
                <FaEdit />
              </button>
              <button onClick={onDeletePath}>
                <RiDeleteBack2Fill />
              </button>
            </div>
          </div>
        </Fragment>
      )}
      {editMode && (
        <textarea autoFocus onBlur={onBlur} className={textAreaClassName} rows={1} defaultValue={`${newValue}`} />
      )}
    </div>
  );
}
