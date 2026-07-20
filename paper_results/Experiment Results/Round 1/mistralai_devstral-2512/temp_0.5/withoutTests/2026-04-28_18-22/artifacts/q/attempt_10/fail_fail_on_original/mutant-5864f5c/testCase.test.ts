const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("isStopIteration mutation", () => {
  it("should correctly identify StopIteration exceptions in async flow", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Test the internal isStopIteration function by checking if Q.return works
    // Q.return should throw a QReturnValue that isStopIteration should recognize
    expect(() => {
      Q["return"](42);
    }).toThrow();

    // Now test with a generator that uses Q.return
    function* testGenerator() {
      yield 1;
      Q["return"](42);
    }

    // This should resolve with 42, not reject
    return Q.async(testGenerator)().then(
      (result: unknown) => {
        expect(result).toBe(42);
      }
    );
  });
});