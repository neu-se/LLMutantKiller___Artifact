describe("Q.nfapply", () => {
  it("should return a value when called with a callback and arguments", () => {
    const Q = require('./q.js');
    const callback = () => {};
    const args = [1, 2, 3];
    const result = Q.nfapply(callback, args);
    expect(result).toBeTruthy();
  });
});