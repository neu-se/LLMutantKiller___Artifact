import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
  it("should return the own property keys of a fulfilled object", () => {
    const obj = { x: 1, y: 2, z: 3 };

    return Q(obj)
      .keys()
      .then((keys: string[]) => {
        expect(keys.sort()).toEqual(["x", "y", "z"]);
      });
  });
});