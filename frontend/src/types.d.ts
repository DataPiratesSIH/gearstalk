export type Feature = { id: string; cloth: string; color: { hex: string } };

export type AttributeState = {
  attributes: { id: string; gender: string; features: Feature[] }[] | null;
};

export type Actions =
  | { type: "changeAttribute"; newAttribute: any }
  | { type: "addPerson" }
  | { type: "deletePerson"; pid: string }
  | { type: "addFeature"; pid: string }
  | { type: "deleteFeature"; did: string }
  | {
      type: "updateGender";
      uid: string;
      value: string;
    }
  | {
      type: "updateCloth";
      uid: string;
      value: string;
    }
  | {
      type: "updateColor";
      uid: string;
      value: { hex: string };
    };
