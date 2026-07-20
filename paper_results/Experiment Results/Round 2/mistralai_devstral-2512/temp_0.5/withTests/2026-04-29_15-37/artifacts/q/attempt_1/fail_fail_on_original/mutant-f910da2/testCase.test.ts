// Test case to detect the mutation in the async function's StopIteration check
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("async function with generator", () => {
  it("should handle StopIteration correctly in ES6 generators", async () => {
    // Create a generator function that uses StopIteration
    // This test will fail if the mutation is present because the check is inverted
    const testGenerator = Q.async(function* () {
      yield Q.delay(10);
      return "success";
    });

    // The mutation changes the condition from "undefined" to "not undefined"
    // which would break the handling of StopIteration in SpiderMonkey generators
    // This test verifies the original behavior is preserved
    const result = await testGenerator();
    expect(result).toBe("success");
  });
});