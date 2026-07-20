import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly handle long stack traces", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const newStack = promise.stack;
    const lines = newStack.split('\n');
    expect(lines.length).toBeGreaterThan(1);
  });
});