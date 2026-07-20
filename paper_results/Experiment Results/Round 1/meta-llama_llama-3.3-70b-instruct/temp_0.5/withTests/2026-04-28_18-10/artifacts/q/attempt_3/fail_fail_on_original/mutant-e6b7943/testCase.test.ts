import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle StopIteration exception correctly", () => {
    const error = { name: "StopIteration" };
    expect(Q.isStopIteration(error)).toBe(true);
  });
});