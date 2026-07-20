import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generator behavior", () => {
  it("should handle StopIteration correctly in SpiderMonkey generators", async () => {
    // This test specifically targets the mutation in the async function
    // where the check for StopIteration was inverted

    // Create a generator function that uses the old SpiderMonkey style
    // with Q.return() which throws a QReturnValue (similar to StopIteration)
    const oldStyleGenerator = Q.async(function() {
      return {
        next: function() {
          return { value: 1, done: false };
        },
        "throw": function() {
          throw new Q.QReturnValue(42);
        }
      };
    });

    // The original code should handle this correctly
    // The mutated code will fail because the StopIteration check is inverted
    try {
      const result = await oldStyleGenerator();
      expect(result).toBe(42);
    } catch (error) {
      // In the mutated version, this will throw because StopIteration handling is broken
      expect(error).toBeUndefined();
    }
  });
});