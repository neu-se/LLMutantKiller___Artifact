import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle StopIteration exception correctly", () => {
    expect(() => {
      Q.isStopIteration({}));
    }).not.toThrow();
  });
});