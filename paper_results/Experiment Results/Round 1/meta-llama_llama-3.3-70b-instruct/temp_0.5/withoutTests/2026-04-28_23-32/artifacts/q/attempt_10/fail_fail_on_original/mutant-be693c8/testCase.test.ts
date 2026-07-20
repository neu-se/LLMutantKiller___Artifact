describe("Q", () => {
  it("should reject the promise after the specified timeout", (done) => {
    const Q = require('../../../../../../../q.js');
    const promise = Q.timeout(Q.resolve("test"), 100);
    let resolved = false;
    let rejected = false;
    promise.then(() => {
      resolved = true;
    }).catch(() => {
      rejected = true;
    });
    setTimeout(() => {
      expect(resolved).toBe(false);
      expect(rejected).toBe(true);
      done();
    }, 150);
  });
});