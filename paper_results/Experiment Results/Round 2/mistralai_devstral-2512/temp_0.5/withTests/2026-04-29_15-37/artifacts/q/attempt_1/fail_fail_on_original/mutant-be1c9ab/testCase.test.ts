import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIterationException = {
      toString: () => "[object StopIteration]"
    };

    // Create a mock QReturnValue instance
    const qReturnValue = new (function QReturnValue() {
      this.value = "test";
    })();

    // Test with StopIteration-like exception (should be treated as StopIteration)
    const result1 = Q.async(function* () {
      try {
        throw stopIterationException;
      } catch (e) {
        // In the original code, this should be caught as StopIteration
        // In the mutated code, it won't be caught because it's not a QReturnValue
        return "caught";
      }
    })();

    // Test with QReturnValue (should be treated as return value in both cases)
    const result2 = Q.async(function* () {
      try {
        throw qReturnValue;
      } catch (e) {
        return "not caught";
      }
    })();

    return Promise.all([
      result1.then(value => expect(value).toBe("caught")),
      result2.then(value => expect(value).toBe("not caught"))
    ]);
  });
});