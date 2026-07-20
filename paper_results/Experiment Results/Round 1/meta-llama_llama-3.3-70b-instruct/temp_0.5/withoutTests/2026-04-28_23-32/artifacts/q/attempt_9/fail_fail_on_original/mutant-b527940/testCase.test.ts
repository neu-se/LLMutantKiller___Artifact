const Q = require('../../../../q');

describe("Q", () => {
  it("should correctly track unhandled rejections", () => {
    const promise = Q.reject("Test rejection");
    const originalLength = Q.getUnhandledReasons().length;
    Q.nextTick(() => {
      const newLength = Q.getUnhandledReasons().length;
      expect(newLength).toBeGreaterThan(originalLength);
    });
  });
});