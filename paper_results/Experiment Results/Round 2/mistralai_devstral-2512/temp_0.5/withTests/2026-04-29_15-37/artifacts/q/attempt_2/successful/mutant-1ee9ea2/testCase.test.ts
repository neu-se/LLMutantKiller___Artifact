// Test case to detect the mutation in the async function handling
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("async function with ES6 generators", () => {
  it("should properly handle ES6 generator with done property", async () => {
    // This test specifically targets the mutation in the async function
    // where the ES6 generator handling code was removed
    const result = await Q.async(function* () {
      const value = yield Q(10);
      return value + 5;
    })();

    expect(result).toBe(15);
  });
});