const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys function", () => {
  it("should correctly filter out inherited properties when enumerating object keys", async () => {
    const parent = { inheritedProp: "inherited" };
    const child = Object.create(parent);
    child.ownProp = "own";

    const keys = await Q.keys(child);

    // The mutation removes the hasOwnProperty check, which would cause inheritedProp to be included
    // This test explicitly checks that inherited properties are NOT included
    expect(keys).toEqual(["ownProp"]);
    expect(keys.includes("inheritedProp")).toBe(false);
  });
});