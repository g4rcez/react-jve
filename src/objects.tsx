import { dissocPath } from "ramda";
import { Fragment, useCallback, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { ComponentParser } from "./component-parser";
import { AddNodeForm } from "./add-node-form";
import { Arrow } from "./arrow";
import { ClipboardButton } from "./copy-to-clipboard";
import { CommonProps } from "./types";
import React from "react";


type Props = {
  onChange?: (newData: any) => void;
} & CommonProps<Object>;

export const Objects = ({ onChange, ...props }: Props) => {
  const [view, setView] = useState(true);
  const [viewCreate, setViewCreate] = useState(false);
  const path = useMemo(() => props.path ?? [], [props.path]);

  const toggle = useCallback(() => setView((p) => !p), []);
  const toggleCreate = useCallback(() => setViewCreate((p) => !p), []);

  const onDelete = useCallback(() => {
    const newOne = dissocPath(props.path, props.source);
    onChange?.(newOne);
  }, [onChange, props.path, props.source]);


  return (
    <Fragment>
      <div className="flex items-center">
        <span className="jv-curly-brackets">{"{"}</span>
        <Arrow toggle={toggle} view={view} />
        <span className="ml-6 hover:opacity-100 opacity-10 cursor-pointer transition-all text-xs mt-1 items-center">
          <ClipboardButton data={props.data} />
          <button className="ml-2" onClick={onDelete}>
            <RiDeleteBack2Fill />
          </button>
          <button className="ml-2" onClick={toggleCreate}>
            <FaPlus />
          </button>
        </span>
      </div>
      <AddNodeForm
        onChange={onChange}
        onCreate={toggleCreate}
        path={props.path}
        source={props.source}
        view={viewCreate}
      />
      <div className={view ? "w-auto" : "hidden"}>
        {Object.entries(props.data).map(([key, val], i) => {
          const pathKey = (props.path ?? []).join("-");
          return (
            <div
              key={`${pathKey}-object-${i}`}
              className="border-l border-jv ml-4 pl-2 border-dashed flex tabular-nums text-base flex-row"
            >
              <span className="inline">"{key}":</span>
              <div className="ml-4 flex">
                <ComponentParser
                  {...props}
                  onChange={onChange}
                  arrayItem={false}
                  index={i}
                  path={path.concat(key)}
                  data={val}
                />
              </div>
            </div>
          );
        })}
      </div>
      <span className="jv-curly-brackets">{"}"}</span>
    </Fragment>
  );
};
