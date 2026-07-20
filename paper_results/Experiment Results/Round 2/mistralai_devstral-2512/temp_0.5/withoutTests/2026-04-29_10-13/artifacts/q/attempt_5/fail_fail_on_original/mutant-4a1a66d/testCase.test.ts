const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generator", () => {
  it("should detect the mutation by checking StopIteration handling", async () => {
    const testValue = "test";
    let stopIterationHandled = false;

    // Create a generator that uses StopIteration
    const asyncFn = Q.async(function* () {
      if (typeof StopIteration !== "undefined") {
        stopIterationHandled = true;
        throw new StopIteration(testValue);
      }
      return testValue;
    });

    const result = await asyncFn();

    // In the original code, StopIteration should be handled
    // In the mutated code (if true), it should not be handled
    expect(stopIterationHandled).toBe(true);
    expect(result).toBe(testValue);
  });
});