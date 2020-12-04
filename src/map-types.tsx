import { Dates, Null, Numbers, Strings, Undefined } from "./components";
import { Objects } from "./objects";
import { Type } from "./types";


type Records = Partial<Record<Type, React.FC<any>>>;
export const MapTypes: Records = {
  [Type.Obj]: Objects,
  [Type.Num]: Numbers,
  [Type.Null]: Null,
  [Type.Str]: Strings,
  [Type.Date]: Dates,
  [Type.Undefined]: Undefined,
};
