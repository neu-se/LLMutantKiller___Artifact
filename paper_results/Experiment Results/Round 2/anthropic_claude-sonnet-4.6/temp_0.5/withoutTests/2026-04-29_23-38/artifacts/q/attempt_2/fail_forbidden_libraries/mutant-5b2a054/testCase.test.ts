import { describe, it, expect } from "@jest/globals";

describe("Q browser error path", () => {
  it("should throw error via setTimeout callback in non-node environments", (done) => {
    // Override process.toString to simulate a browser-like environment
    const origProcessToString = process.toString;
    process.toString = () => "[object Object]";

    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

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