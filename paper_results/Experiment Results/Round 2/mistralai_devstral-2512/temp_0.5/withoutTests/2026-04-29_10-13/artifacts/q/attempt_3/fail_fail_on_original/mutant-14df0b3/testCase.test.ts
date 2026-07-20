const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete", () => {
  it("should return a promise when deleting a property", () => {
    const testObj = { prop: "value" };
    const result = Q.delete(testObj, "prop");
    expect(result).toBeInstanceOf(Q.makePromise());
  });
});