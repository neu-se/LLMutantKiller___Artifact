import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should correctly handle long stack traces", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const stack = promise.stack;
    expect(stack).toContain("makeStackTraceLong");
  });
});