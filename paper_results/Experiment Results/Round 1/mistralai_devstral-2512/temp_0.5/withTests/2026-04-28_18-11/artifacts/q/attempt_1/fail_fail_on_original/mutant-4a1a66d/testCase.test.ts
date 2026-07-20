// Test case to detect the mutation in the async function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("async function mutation detection", () => {
  it("should correctly handle ES6 generators (not SpiderMonkey)", async () => {
    // This test will pass in the original code where StopIteration is checked
    // but fail in the mutated code where the condition is always true
    const result = await Q.async(function* () {
      const val = yield Q(10);
      return val + 5;
    })();

    expect(result).toBe(15);
  });
});