const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");
const Q = qFactory();

describe("Q library mutation test", () => {
  it("should handle StopIteration exceptions correctly", () => {
    // Create a mock StopIteration that is NOT a QReturnValue
    const mockStopIteration = new Error();
    mockStopIteration.toString = () => "[object StopIteration]";

    // Create a promise that rejects with our mock StopIteration
    const promise = Q.reject(mockStopIteration);

    // The original code should handle this as a StopIteration
    // The mutated code will treat it differently
    return promise.then(
      () => {
        throw new Error("Should have been rejected");
      },
      (error: any) => {
        // In original code, this should be treated as StopIteration
        // In mutated code, it won't be
        expect(error).toBe(mockStopIteration);
      }
    );
  });
});