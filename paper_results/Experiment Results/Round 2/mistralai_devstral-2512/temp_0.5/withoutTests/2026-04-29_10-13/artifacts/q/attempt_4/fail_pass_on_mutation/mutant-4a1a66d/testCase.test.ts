const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generator", () => {
  it("should properly handle generator return values with StopIteration", async () => {
    const testValue = "test";
    const asyncFn = Q.async(function* () {
      if (typeof StopIteration !== "undefined") {
        throw new StopIteration(testValue);
      }
      return testValue;
    });

    const result = await asyncFn();
    expect(result).toBe(testValue);
  });
});