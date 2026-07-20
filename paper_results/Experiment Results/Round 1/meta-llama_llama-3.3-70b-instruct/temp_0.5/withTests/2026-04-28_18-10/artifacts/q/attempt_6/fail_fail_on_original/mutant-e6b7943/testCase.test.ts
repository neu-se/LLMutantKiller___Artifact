import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle StopIteration exception correctly", () => {
    const error = new Error();
    error.name = "StopIteration";
    expect(Q.isStopIteration(error)).toBe(true);
    const anotherError = {};
    expect(Q.isStopIteration(anotherError)).toBe(false);
  });
});