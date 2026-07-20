describe("Q Promise", () => {
  it("should not have an exception property for fulfilled promises", () => {
    const Q = require('./q.js');
    const promise = Q.resolve("test");
    expect(Object.prototype.hasOwnProperty.call(promise, 'exception')).toBe(false);
  });
});