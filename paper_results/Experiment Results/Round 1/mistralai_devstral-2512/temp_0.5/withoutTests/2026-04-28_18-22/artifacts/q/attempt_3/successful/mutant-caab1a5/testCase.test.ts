const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.when", () => {
  it("should resolve a value through the promise chain", async () => {
    const value = "test";
    const result = await Q.when(value);
    expect(result).toBe(value);
  });
});