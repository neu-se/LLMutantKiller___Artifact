const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly handle StopIteration exceptions in async generators", () => {
    // Create a mock StopIteration exception
    const stopIterationException = {
      toString: () => "[object StopIteration]"
    };

    // Test with StopIteration-like exception
    let caught = false;
    const result = Q.async(function* () {
      try {
        throw stopIterationException;
      } catch (e) {
        caught = true;
        return "caught";
      }
    })();

    return result.then((value: string) => {
      expect(value).toBe("caught");
      expect(caught).toBe(true);
    });
  });
});