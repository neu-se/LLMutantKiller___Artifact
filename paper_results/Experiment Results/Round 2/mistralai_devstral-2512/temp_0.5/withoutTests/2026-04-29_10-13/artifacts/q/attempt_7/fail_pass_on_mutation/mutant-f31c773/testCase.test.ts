const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should fail when setting property with empty arguments array", () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);

    // This should fail because the mutated code passes empty array
    return promise.set("prop", "updated").then(() => {
      // If we get here with mutated code, the property won't be updated
      // because the arguments were empty
      expect(obj.prop).not.toBe("initial");
    });
  });
});