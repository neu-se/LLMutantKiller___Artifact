describe("Q", () => {
  it("should correctly handle long stack traces", () => {
    const Q = require('../../../../../../../../subject_repositories/q/q.js');
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const newStack = promise.stack;
    expect(newStack).toContain("makeStackTraceLong");
  });
});