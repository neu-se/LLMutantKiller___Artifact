import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain mutation test', () => {
  it('should pass the correct abort value when op returns false', (done) => {
    const customError = new Error('custom abort');
    let receivedAbort: any = null;
    let readCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        receivedAbort = abort;
        return cb(abort);
      }
      readCount++;
      if (readCount === 1) {
        cb(null, 'test');
      } else {
        cb(true);
      }
    };

    const op = (data: any) => {
      return false;
    };

    const doneCallback = (err: any) => {
      // Original code: read(abort || true, ...)
      // Mutated code: read(true, ...)
      // When abort is set to customError, original should pass customError
      // Mutated will always pass true
      expect(receivedAbort).toBe(customError);
      expect(readCount).toBe(1);
      done();
    };

    const sink = drain(op, doneCallback);
    sink.abort(customError);
    pull(source, sink);
  }, 100); // 100ms timeout
});