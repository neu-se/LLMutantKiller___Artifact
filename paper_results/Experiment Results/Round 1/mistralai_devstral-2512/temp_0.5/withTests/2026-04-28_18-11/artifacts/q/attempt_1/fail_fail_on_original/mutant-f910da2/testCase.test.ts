import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generator behavior", () => {
  it("should handle StopIteration correctly in SpiderMonkey generators", async () => {
    // This test specifically targets the mutation in the async function
    // where the check for StopIteration was inverted

    // Create a generator function that uses the old SpiderMonkey style
    // with Q.return() which throws a QReturnValue (similar to StopIteration)
    const oldStyleGenerator = Q.async(function* () {
      yield Q(1);
      yield Q(2);
      Q["return"](42); // This throws a QReturnValue
    });

    // The original code should handle this correctly
    // The mutated code will fail because the StopIteration check is inverted
    const result = await oldStyleGenerator();
    expect(result).toBe(42);
  });
});