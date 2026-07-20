import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain mutation test', () => {
  it('should pass abort signal when op returns false', (done) => {
    let abortReceived: any = null;
    let readCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortReceived = abort;
        return cb(abort);
      }
      readCount++;
      if (readCount === 1) {
        cb(null, 'test-data');
      } else {
        cb(true);
      }
    };

    const op = (data: any) => {
      return false;
    };

    const doneCallback = (err: any) => {
      // In original code, abort should be passed as (abort || true)
      // In mutated code, abort is always true
      expect(abortReceived).toBe(true);
      expect(readCount).toBe(1);
      done();
    };

    pull(
      source,
      drain(op, doneCallback)
    );
  });
});