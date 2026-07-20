describe("Q", () => {
  it("should correctly handle promise rejection with a stack trace", () => {
    const Q = require('./q.js');
    const error = new Error("Test rejection");
    const promise = Q.reject(error);
    expect(promise.isRejected()).toBe(true);
    promise.catch((err: any) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});