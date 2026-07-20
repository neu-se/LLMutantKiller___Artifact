import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly filter stack traces", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const stack = promise.inspect().reason.stack;
    expect(stack).not.toContain("q.js");
  });
});