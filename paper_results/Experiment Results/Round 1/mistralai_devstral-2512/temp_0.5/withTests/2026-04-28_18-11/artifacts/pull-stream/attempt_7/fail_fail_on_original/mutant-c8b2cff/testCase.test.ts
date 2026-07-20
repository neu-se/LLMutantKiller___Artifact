import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should pass the correct abort value when op returns false', (done) => {
    const customAbortValue = { error: true, message: 'custom abort' };
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
      // In original code: read(abort || true, ...) would pass customAbortValue
      // In mutated code: read(true, ...) would pass true
      expect(receivedAbortValue).toBe(customAbortValue);
      done();
    };

    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const sink = drain(op, doneCallback);

    // Set abort to custom value before calling sink
    (sink as any).abort(customAbortValue);
    sink(source);
  }, 10000);
});