
import { dissocPath } from "ramda";
import React, { useCallback, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { ComponentParser } from "./component-parser";
import { AddNodeForm } from "./add-node-form";
import { Arrow } from "./arrow";
import { ClipboardButton } from "./copy-to-clipboard";
import { OnChangeJson, Type } from "./types";

type ArrayParserProps<T = any[]> = {
  data: T[];
  source: T;
  type: Type;
  path: string[];
  onChange: OnChangeJson<T>;
};

export function Arrays<T = any[]>({ onChange, ...props }: ArrayParserProps<T>) {
  const [viewCreate, setViewCreate] = useState(false);

  const path = useMemo(() => {
    const p = props.path;
    if ((Array.isArray(p) && p.length === 0) || p === undefined) {
      return [0];
    }
    return p;
  }, [props.path]);

  const [view, setView] = useState(true);

  const toggle = useCallback(() => setView((p) => !p), []);
  
  const toggleCreate = useCallback(() => setViewCreate((p) => !p), []);

  const className = useMemo(
    () => (view ? "flex flex flex-col" : "flex flex flex-col hidden"),
    [view]
  );

  const onDelete = useCallback(() => {
    const newOne: T = dissocPath(path, props.source);
    onChange?.(newOne);
  }, [onChange, path, props.source]);


  return (
    <div className="flex flex-col">
      <div className="flex">
        <span className="jv-square-brackets">[</span>
        <Arrow toggle={toggle} view={view} />
        <div className="inline-flex ml-4 hover:opacity-100 opacity-10 cursor-pointer transition-all">
          <div className="grid grid-cols-3 text-xs gap-x-2">
            <ClipboardButton data={props.data} />
            <button onClick={onDelete}>
              <RiDeleteBack2Fill />
            </button>
            <button onClick={toggleCreate}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
      <AddNodeForm
        isArray
        length={props.data.length}
        onChange={onChange}
        onCreate={toggleCreate}
        path={props.path}
        source={props.source}
        view={viewCreate}
      />
      <div hidden={view} className={className}>
        {props.data.map((x, i) => {
          const path = [...props.path, i];
          const pathKey = path.join("-");
          return (
            <div
              className="ml-2 border-l border-jv border-dashed pl-4 flex-col"
              key={`${pathKey}-jv-array-item-${i}`}
            >
              <ComponentParser
                {...props}
                onChange={onChange}
                source={props.source}
                type={props.type}
                arrayItem
                path={path}
                index={i}
                data={x}
              />
            </div>
          );
        })}
      </div>
      <div className="flex">
        <span className="jv-square-brackets">]</span>
      </div>
    </div>
  );
}
