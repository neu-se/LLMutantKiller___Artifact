import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should return keys for object with own properties", () => {
    const obj = { a: 1, b: 2 };
    return Q.keys(obj).then((keys: string[]) => {
      expect(keys.length).toBeGreaterThan(0);
      expect(keys).toContain("a");
      expect(keys).toContain("b");
    });
  });
});