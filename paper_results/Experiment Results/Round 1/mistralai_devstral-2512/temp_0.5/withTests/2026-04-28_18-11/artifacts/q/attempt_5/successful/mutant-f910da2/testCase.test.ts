import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generator behavior", () => {
  it("should handle StopIteration correctly in SpiderMonkey generators", async () => {
    // This test specifically targets the mutation in the async function
    // where the check for StopIteration was inverted

    // Create a simple async function that should work with the original code
    // but will fail with the mutated code due to the inverted StopIteration check
    const testAsync = Q.async(function*() {
      yield Q(1);
      return 42;
    });

    // The original code should handle this correctly
    // The mutated code will fail because the StopIteration check is inverted
    const result = await testAsync();
    expect(result).toBe(42);
  });
});