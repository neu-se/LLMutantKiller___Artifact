import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain mutation test', () => {
  it('should pass the correct abort value when op returns false', (done) => {
    let abortValue: any = null;
    let readCalls = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortValue = abort;
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
      // In mutated code: read(true, done || function () {})
      // This test verifies the abort value is passed correctly
      expect(abortValue).toBe(true);
      expect(readCalls).toBe(1);
      done();
    };

    pull(
      source,
      drain(op, doneCallback)
    );
  });
});