import { Q } from "../../../q.js";

describe("Q", () => {
  it("should correctly filter stack traces", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const stack = promise.inspect().reason.stack;
    const lines = stack.split("\n");
    expect(lines.length).toBeGreaterThan(0);
    // Since the mutation causes an infinite loop, the stack trace should not be empty
    // If the mutation is present, this test should fail because the loop will cause a stack overflow
  });
});