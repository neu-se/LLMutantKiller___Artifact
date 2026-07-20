import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should return empty array for object with no own properties", () => {
    const obj = Object.create({ inherited: "value" });
    return Q.keys(obj).then((keys: string[]) => {
      expect(keys).toEqual([]);
    });
  });
});