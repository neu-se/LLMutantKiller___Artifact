const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should distinguish between StopIteration and QReturnValue exceptions", () => {
    // Create a mock StopIteration exception (not a QReturnValue)
    const stopIterationException = {
      toString: () => "[object StopIteration]"
    };

    // Test with StopIteration-like exception that should be caught as return value
    const result = Q.async(function* () {
      throw stopIterationException;
      return "unreachable";
    })();

    return result.then((value: any) => {
      // In original code: StopIteration alone should be treated as return value
      // In mutated code: StopIteration alone should NOT be treated as return value
      expect(value).toBeUndefined();
    });
  });
});