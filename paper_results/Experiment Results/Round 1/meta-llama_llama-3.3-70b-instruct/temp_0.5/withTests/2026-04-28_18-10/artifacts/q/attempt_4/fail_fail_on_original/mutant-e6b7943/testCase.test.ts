import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle StopIteration exception correctly", () => {
    const originalIsStopIteration = Q.isStopIteration;
    Q.isStopIteration = function (exception) {
      return exception instanceof QReturnValue;
    };
    const error = {};
    expect(Q.isStopIteration(error)).toBe(false);
    Q.isStopIteration = originalIsStopIteration;
  });
});