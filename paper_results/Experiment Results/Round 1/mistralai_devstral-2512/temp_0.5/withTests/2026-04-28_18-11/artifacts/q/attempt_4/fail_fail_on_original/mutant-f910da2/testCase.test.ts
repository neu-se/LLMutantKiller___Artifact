import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generator behavior", () => {
  it("should handle StopIteration correctly in SpiderMonkey generators", async () => {
    // This test specifically targets the mutation in the async function
    // where the check for StopIteration was inverted

    // Create a mock generator that throws StopIteration
    const mockGenerator = function() {
      return {
        next: function() {
          return { value: 1, done: false };
        },
        "throw": function() {
          // Simulate StopIteration being thrown
          const error = new Error();
          (error as any).name = "StopIteration";
          (error as any).value = 42;
          throw error;
        }
      };
    };

    // Test that the original code handles StopIteration correctly
    const asyncFn = Q.async(mockGenerator);
    const result = await asyncFn();
    expect(result).toBe(42);
  });
});