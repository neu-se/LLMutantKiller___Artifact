const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generator", () => {
  it("should properly handle generator return values", async () => {
    const testValue = "test";
    const asyncFn = Q.async(function* () {
      return testValue;
    });

    const result = await asyncFn();
    expect(result).toBe(testValue);
  });
});