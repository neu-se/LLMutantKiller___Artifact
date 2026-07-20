const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys function", () => {
  it("should correctly filter out inherited properties from objects", async () => {
    const parent = { inheritedProp: "inherited" };
    const child = Object.create(parent);
    child.ownProp = "own";

    const keys = await Q.keys(child);

    expect(keys).toEqual(["ownProp"]);
    expect(keys.length).toBe(1);
  });
});