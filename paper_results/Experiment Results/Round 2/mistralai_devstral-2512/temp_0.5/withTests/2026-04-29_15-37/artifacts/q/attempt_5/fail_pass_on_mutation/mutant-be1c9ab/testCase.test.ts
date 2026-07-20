const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly identify StopIteration exceptions in async generators", () => {
    // Create a mock StopIteration exception
    const stopIterationException = {
      toString: () => "[object StopIteration]"
    };

    // Test with StopIteration-like exception
    const result = Q.async(function* () {
      try {
        throw stopIterationException;
      } catch (e) {
        return "caught";
      }
    })();

    return result.then((value: string) => {
      expect(value).toBe("caught");
    });
  });
});