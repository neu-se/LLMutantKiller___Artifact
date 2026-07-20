import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should handle StopIteration exception correctly", () => {
    const error = new Error();
    error.name = "StopIteration";
    expect(Q.isStopIteration(error)).toBe(true);
  });
});