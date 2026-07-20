import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain mutation test', () => {
  it('should pass the abort error when op returns false and abort is set', (done) => {
    const customError = new Error('custom abort error');
    let receivedError: any = null;
    let readCalls = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        receivedError = abort;
        return cb(abort);
      }
      readCalls++;
      if (readCalls === 1) {
        cb(null, 'data');
      } else {
        cb(true);
      }
    };

    const op = (data: any) => {
      return false;
    };

    const doneCallback = (err: any) => {
      // In original code: read(abort || true, done || function () {})
      // When abort is set to customError, original code should pass customError
      // In mutated code: read(true, done || function () {})
      // Mutated code will always pass true, not the custom error
      expect(receivedError).toBe(customError);
      expect(readCalls).toBe(1);
      done();
    };

    const drainSink = drain(op, doneCallback);
    drainSink.abort(customError);
    pull(source, drainSink);
  });
});