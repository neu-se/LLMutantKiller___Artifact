import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should return own property keys of an object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    return Q.keys(obj).then((keys) => {
      expect(keys.sort()).toEqual(["a", "b", "c"]);
    });
  });
});