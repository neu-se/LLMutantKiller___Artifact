import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with SpiderMonkey generators", () => {
  it("should handle StopIteration exception correctly", async () => {
    // This test specifically targets the mutation in the async function
    // where the check for StopIteration was changed from `if (result.done)`
    // to `if (false)`, which would break the proper handling of generator completion

    // Create a simple generator that returns a value
    function* testGenerator() {
      return "test value";
    }

    // Use Q.async to wrap the generator
    const asyncFn = Q.async(testGenerator);

    // Execute the async function
    const result = await asyncFn();

    // The result should be the value returned by the generator
    expect(result).toBe("test value");
  });
});