const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys mutation", () => {
  it("should correctly handle objects with prototype properties", async () => {
    const obj = Object.create({ prototypeProp: 1 });
    obj.ownProp = 2;

    const keysPromise = Q.keys(obj);
    const keys = await keysPromise;
    expect(keys).toEqual(["ownProp"]);
    expect(keys.length).toBe(1);
  });
});