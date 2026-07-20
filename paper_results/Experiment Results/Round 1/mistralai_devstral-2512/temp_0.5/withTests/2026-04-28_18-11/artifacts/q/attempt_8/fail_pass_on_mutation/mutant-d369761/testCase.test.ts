import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should return only own enumerable properties and not inherited ones", () => {
    const parent = { inheritedProp: "inherited" };
    const child = Object.create(parent);
    child.ownProp1 = "own1";
    child.ownProp2 = "own2";

    return Q.keys(child).then((keys: string[]) => {
      expect(keys).toEqual(["ownProp1", "ownProp2"]);
      expect(keys).not.toContain("inheritedProp");
      expect(keys.length).toBe(2);
    });
  });
});