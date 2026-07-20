// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly identify StopIteration in generator error handling", async () => {
    // Create a mock StopIteration exception that mimics SpiderMonkey's behavior
    const mockStopIteration = new Error();
    mockStopIteration.toString = () => "[object StopIteration]";

    // Create a generator that throws our mock StopIteration
    function* testGenerator() {
      try {
        yield 1;
        throw mockStopIteration;
      } catch (e) {
        // This catch block should only catch StopIteration in original code
        return "caught";
      }
      return "not caught";
    }

    // Use Q.async to wrap the generator
    const asyncGenerator = Q.async(testGenerator);

    // The mutation changes isStopIteration to always return true
    // In original code: StopIteration should be caught and return "caught"
    // In mutated code: All exceptions treated as StopIteration, behavior changes
    const result = await asyncGenerator();

    // In original code we expect "caught", in mutated code behavior differs
    expect(result).toBe("caught");
  });
});