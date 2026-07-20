import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception that is NOT a QReturnValue
    const mockStopIteration = {
      toString: () => "[object StopIteration]"
    };

    // The original code should return true for StopIteration even if not QReturnValue
    // The mutated code will return false because it requires both conditions
    expect(Q.isStopIteration(mockStopIteration)).toBe(true);
  });
});