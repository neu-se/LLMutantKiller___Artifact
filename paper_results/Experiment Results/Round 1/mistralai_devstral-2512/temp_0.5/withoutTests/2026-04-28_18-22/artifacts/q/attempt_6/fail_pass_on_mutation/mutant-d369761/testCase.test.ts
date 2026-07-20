const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys mutation", () => {
  it("should correctly handle objects with both own and inherited properties", async () => {
    const parent = { inheritedProp: 1 };
    const child = Object.create(parent);
    child.a = 2;
    child.b = 3;
    child.c = 4;

    const keysPromise = Q.keys(child);
    const keys = await keysPromise;
    expect(keys).toEqual(["a", "b", "c"]);
  });
});