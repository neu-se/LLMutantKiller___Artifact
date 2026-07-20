describe("Q", () => {
  it("should correctly handle long stack traces", () => {
    const Q = require('../../../../q.js');
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const newStack = promise.stack;
    const lines = newStack.split('\n');
    const hasStackCounterCheck = lines.some((line: string) => line.includes('__minimumStackCounter__'));
    expect(hasStackCounterCheck).toBe(true);
  });
});