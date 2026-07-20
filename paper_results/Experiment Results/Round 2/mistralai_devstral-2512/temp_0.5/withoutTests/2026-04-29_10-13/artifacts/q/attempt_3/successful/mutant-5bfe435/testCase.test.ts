const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
  it("should use process.nextTick when in a Node.js environment", (done) => {
    const startTime = Date.now();
    let nextTickUsed = false;

    const originalNextTick = process.nextTick;
    process.nextTick = function(callback) {
      nextTickUsed = true;
      originalNextTick.call(process, callback);
    };

    Q.nextTick(() => {
      process.nextTick = originalNextTick;
      expect(nextTickUsed).toBe(true);
      expect(Date.now() - startTime).toBeGreaterThanOrEqual(0);
      done();
    });
  });
});