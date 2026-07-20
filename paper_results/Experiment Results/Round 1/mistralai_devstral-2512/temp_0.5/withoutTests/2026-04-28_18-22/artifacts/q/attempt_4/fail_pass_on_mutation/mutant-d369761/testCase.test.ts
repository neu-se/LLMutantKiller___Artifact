const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys mutation", () => {
  it("should correctly extract own property keys from an object", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keysPromise = Q.keys(obj);
    const keys = await keysPromise;
    expect(keys).toEqual(["a", "b", "c"]);
  });
});