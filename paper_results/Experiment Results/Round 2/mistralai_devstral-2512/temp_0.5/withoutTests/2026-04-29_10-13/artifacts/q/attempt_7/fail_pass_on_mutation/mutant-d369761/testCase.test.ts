const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys function", () => {
  it("should correctly filter out inherited properties and only return own enumerable properties", async () => {
    const parent = { inheritedProp: "inherited" };
    const child = Object.create(parent);
    child.ownProp = "own";

    // Create a non-enumerable property
    Object.defineProperty(child, "nonEnumProp", {
      value: "non-enumerable",
      enumerable: false
    });

    const keys = await Q.keys(child);

    expect(keys).toEqual(["ownProp"]);
    expect(keys).not.toContain("inheritedProp");
    expect(keys).not.toContain("nonEnumProp");
    expect(keys.length).toBe(1);
  });
});