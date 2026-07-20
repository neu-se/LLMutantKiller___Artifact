const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_keys function", () => {
  it("should correctly extract only own enumerable properties from an object", async () => {
    const obj = Object.create({ inheritedProp: "inherited" });
    obj.ownProp1 = "value1";
    obj.ownProp2 = "value2";

    const keysPromise = Q.keys(obj);
    const keys = await keysPromise;

    expect(keys).toEqual(["ownProp1", "ownProp2"]);
    expect(keys).not.toContain("inheritedProp");
  });
});