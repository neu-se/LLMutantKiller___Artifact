describe("Q", () => {
  it("should reject the promise after the specified timeout", (done) => {
    const Q = require('../../../../../../../q.js');
    const promise = Q.timeout(Q.resolve("test"), 100);
    let called = false;
    promise.then(() => {
      called = true;
    }).catch(() => {
      called = true;
    });
    setTimeout(() => {
      expect(called).toBe(true);
      done();
    }, 150);
  });
});