describe("Q", () => {
  it("should reject the promise after the specified timeout", (done) => {
    const Q = require('../../../../../../../q.js');
    const promise = Q.timeout(Q.resolve("test"), 100);
    let rejected = false;
    promise.then(() => {
      done.fail("Promise should be rejected");
    }).catch(() => {
      rejected = true;
    });
    setTimeout(() => {
      expect(rejected).toBe(true);
      done();
    }, 150);
  });
});