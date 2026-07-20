const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys mutation", () => {
  it("should correctly handle objects with mixed property types including inherited ones", async () => {
    const parent = { inheritedProp: 1 };
    const child = Object.create(parent);
    child.ownProp1 = 2;
    child.ownProp2 = 3;

    const keysPromise = Q.keys(child);
    const keys = await keysPromise;
    expect(keys.sort()).toEqual(["ownProp1", "ownProp2"]);
  });
});