const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys function", () => {
  it("should only return own enumerable properties and exclude inherited ones", async () => {
    const parent = { inheritedProp: "inherited" };
    const child = Object.create(parent);
    child.ownProp = "own";

    const keys = await Q.keys(child);

    // This test will fail on the mutated code because it will include inheritedProp
    // when the hasOwnProperty check is removed
    expect(keys).toEqual(["ownProp"]);
    expect(keys).toHaveLength(1);
  });
});