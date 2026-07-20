const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys mutation", () => {
  it("should correctly extract own property keys from an object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = Q.keys(obj);
    expect(keys).toEqual(["a", "b", "c"]);
  });
});