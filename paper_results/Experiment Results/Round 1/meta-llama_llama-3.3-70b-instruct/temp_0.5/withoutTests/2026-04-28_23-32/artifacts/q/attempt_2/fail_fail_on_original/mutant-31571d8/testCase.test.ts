import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly handle long stack traces", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const originalStack = error.stack;
    const newStack = promise.stack;
    expect(newStack).not.toEqual(originalStack);
  });
});