describe("Q browser path error propagation", () => {
  it("should throw error via setTimeout in non-node environments, not silently swallow it", (done) => {
    // Override process.toString to simulate a browser-like environment
    // so that isNodeJS is set to false when Q initializes
    const origProcessToString = process.toString;
    process.toString = () => "[object Object]";

    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore process.toString
    process.toString = origProcessToString;

    const error = new Error("browser path error");
    let errorThrownViaSetTimeout = false;

    const origSetTimeout = global.setTimeout;
    (global as any).setTimeout = function (fn: Function, delay: number) {
      const wrapped = () => {
        try {
          fn();
        } catch (e) {
          if (e === error) {
            errorThrownViaSetTimeout = true;
          }
        }
      };
      return origSetTimeout(wrapped as TimerHandler, delay);
    };

    Q.nextTick(() => {
      throw error;
    });

    origSetTimeout(() => {
      (global as any).setTimeout = origSetTimeout;
      expect(errorThrownViaSetTimeout).toBe(true);
      done();
    }, 500);
  });
});