import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain mutation test', () => {
  it('should pass abort signal correctly when op returns false', (done) => {
    let abortSignal: any = null;
    let readCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortSignal = abort;
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
      expect(abortSignal).toBe(true);
      expect(readCount).toBe(2);
      done();
    };

    const sink = drain(op, doneCallback);
    sink(source);
  });
});