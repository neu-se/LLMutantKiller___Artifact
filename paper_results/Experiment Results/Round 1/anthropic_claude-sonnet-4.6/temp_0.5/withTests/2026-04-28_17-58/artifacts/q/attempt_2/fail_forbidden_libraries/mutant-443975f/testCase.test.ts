import { jest } from "@jest/globals";

describe("Q nextTick scheduler selection", () => {
  it("uses setImmediate for scheduling when available in non-Node environment", (done) => {
    jest.resetModules();

    const origToString = process.toString;
    const origMessageChannel = (global as any).MessageChannel;
    const origSetImmediate = (global as any).setImmediate;
    const origSetTimeout = (global as any).setTimeout;

    // Make Q think it's not in a real Node.js environment
    process.toString = () => "[object Object]";
    // Remove MessageChannel to force setTimeout fallback if setImmediate branch is skipped
    (global as any).MessageChannel = undefined;

    let setImmediateCalled = false;
    let setTimeoutCalled = false;

    (global as any).setImmediate = (fn: Function) => {
      setImmediateCalled = true;
      return origSetImmediate(fn);
    };

    (global as any).setTimeout = (fn: Function, ms: number) => {
      setTimeoutCalled = true;
      return origSetTimeout(fn, ms);
    };

    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Q2.nextTick(() => {
      // Restore everything
      process.toString = origToString;
      (global as any).setImmediate = origSetImmediate;
      (global as any).setTimeout = origSetTimeout;
      (global as any).MessageChannel = origMessageChannel;

      // Original: setImmediate branch taken → setImmediateCalled = true
      // Mutated: setImmediate branch skipped → setTimeout used → setTimeoutCalled = true
      expect(setImmediateCalled).toBe(true);
      expect(setTimeoutCalled).toBe(false);
      done();
    });
  });
});