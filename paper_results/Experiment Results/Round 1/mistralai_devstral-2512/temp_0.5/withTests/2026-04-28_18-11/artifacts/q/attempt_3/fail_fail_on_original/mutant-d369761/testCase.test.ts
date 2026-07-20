import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should only return own property keys, not inherited ones", () => {
    class Parent {
      inheritedProp = "inherited";
    }
    class Child extends Parent {
      ownProp = "own";
    }
    const obj = new Child();
    return Q.keys(obj).then((keys: string[]) => {
      expect(keys).toEqual(["ownProp"]);
      expect(keys).not.toContain("inheritedProp");
    });
  });
});