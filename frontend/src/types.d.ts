export type Feature = {
  id: string;
  labels: string[];
  colors: { hex: string }[];
};

export type AttributeState = {
  attributes: Feature[] | null;
};

export type Actions =
  | { type: "changeAttribute"; newAttribute: any }
  | { type: "addPerson" }
  | { type: "deletePerson"; pid: string }
  | { type: "addLabel"; pid: string; value: string }
  | { type: "removeLabel"; pid: string; value: string }
  | { type: "addColor"; pid: string; value: { hex: string } }
  | { type: "updateColor"; pid: string; idx: number; value: { hex: string } }
  | { type: "removeColor"; pid: string; };
