const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys mutation", () => {
  it("should correctly handle objects with only inherited properties", async () => {
    const parent = { a: 1, b: 2, c: 3 };
    const child = Object.create(parent);

    const keysPromise = Q.keys(child);
    const keys = await keysPromise;
    expect(keys).toEqual([]);
  });
});