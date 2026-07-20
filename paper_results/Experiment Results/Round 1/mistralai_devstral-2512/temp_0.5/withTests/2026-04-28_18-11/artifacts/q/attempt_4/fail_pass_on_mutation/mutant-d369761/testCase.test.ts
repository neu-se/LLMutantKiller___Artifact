import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should return only own enumerable properties", () => {
    const obj = Object.create({ inherited: "value" });
    obj.own = "ownValue";
    return Q.keys(obj).then((keys: string[]) => {
      expect(keys).toEqual(["own"]);
      expect(keys).not.toContain("inherited");
    });
  });
});