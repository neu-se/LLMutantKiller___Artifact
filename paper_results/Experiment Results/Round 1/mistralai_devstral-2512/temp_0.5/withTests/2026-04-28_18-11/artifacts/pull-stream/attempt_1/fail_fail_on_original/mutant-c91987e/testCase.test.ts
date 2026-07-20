import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should call read with abort when sink.abort is invoked', (done) => {
    let abortCalled = false;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortCalled = true;
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const sink = drain((data: any) => {}, () => {});

    // Start reading
    sink(source);

    // Immediately abort
    sink.abort();

    // Verify that the source was called with abort
    setImmediate(() => {
      expect(abortCalled).toBe(true);
      done();
    });
  });
});