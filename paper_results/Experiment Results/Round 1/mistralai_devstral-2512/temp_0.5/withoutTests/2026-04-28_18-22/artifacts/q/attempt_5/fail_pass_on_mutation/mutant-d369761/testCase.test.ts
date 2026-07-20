const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys mutation", () => {
  it("should correctly filter out inherited properties from object keys", async () => {
    const parent = { inheritedProp: 1 };
    const child = Object.create(parent);
    child.ownProp = 2;

    const keysPromise = Q.keys(child);
    const keys = await keysPromise;
    expect(keys).toEqual(["ownProp"]);
  });
});