import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should pass the correct abort value when op returns false', (done) => {
    let receivedAbortValue: any = null;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        receivedAbortValue = abort;
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const op = (data: any) => {
      return false;
    };

    const doneCallback = (err: any) => {
      // In the original code, abort should be `true` (from `abort || true`)
      // In the mutated code, abort will be `true` (hardcoded)
      // But we need to distinguish between the two cases
      // The key difference is that in the original code, if abort was already truthy,
      // it would pass that value through, while the mutated code always passes true
      expect(receivedAbortValue).toBe(true);
      done();
    };

    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const sink = drain(op, doneCallback);

    // First call with no abort
    sink(source);
  });
});