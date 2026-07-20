// Test case to detect the mutation in the async function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("async function mutation test", () => {
  it("should correctly handle generator with 'next' verb", async () => {
    // Create a simple generator that yields a value
    function* testGenerator() {
      yield 1;
      return 2;
    }

    // Use Q.async to wrap the generator
    const asyncFn = Q.async(testGenerator);

    // Execute the async function and verify the result
    const result = await asyncFn();

    // The result should be the final value returned by the generator
    expect(result).toBe(2);
  });
});