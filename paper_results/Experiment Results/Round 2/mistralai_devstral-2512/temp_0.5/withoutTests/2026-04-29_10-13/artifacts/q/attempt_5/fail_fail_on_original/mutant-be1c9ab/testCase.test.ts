const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");
const Q = qFactory();

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception that is NOT a QReturnValue
    const mockStopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Access the internal isStopIteration function through the Q module
    // The original code should return true for StopIteration even if not QReturnValue
    // The mutated code will return false because it requires both conditions
    expect(Q.isStopIteration(mockStopIteration)).toBe(true);
  });
});