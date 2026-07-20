import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should pass abort signal correctly when op returns false', (done) => {
    let abortSignal: any = null;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortSignal = abort;
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const op = (data: any) => {
      return false;
    };

    const doneCallback = (err: any) => {
      expect(abortSignal).toBe(true);
      expect(err).toBeNull();
      done();
    };

    const sink = drain(op, doneCallback);
    (sink as any)(source);
  });
});