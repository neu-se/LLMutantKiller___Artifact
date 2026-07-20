const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys function", () => {
  it("should correctly handle objects with inherited properties and return only own properties", async () => {
    const parent = { inheritedProp: "inherited" };
    const child = Object.create(parent);
    child.ownProp1 = "value1";
    child.ownProp2 = "value2";

    const keys = await Q.keys(child);

    // This test specifically checks that inherited properties are filtered out
    // The mutation removes the hasOwnProperty check, which would cause inheritedProp to be included
    expect(keys).toEqual(["ownProp1", "ownProp2"]);
    expect(keys).not.toContain("inheritedProp");
    expect(keys.length).toBe(2);
  });
});