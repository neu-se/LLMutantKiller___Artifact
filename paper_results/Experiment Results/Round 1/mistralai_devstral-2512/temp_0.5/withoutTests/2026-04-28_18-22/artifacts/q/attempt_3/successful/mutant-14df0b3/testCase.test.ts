const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete", () => {
  it("should return a promise when deleting a property", () => {
    const obj = { key: "value" };
    const result = Q["delete"](obj, "key");
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});