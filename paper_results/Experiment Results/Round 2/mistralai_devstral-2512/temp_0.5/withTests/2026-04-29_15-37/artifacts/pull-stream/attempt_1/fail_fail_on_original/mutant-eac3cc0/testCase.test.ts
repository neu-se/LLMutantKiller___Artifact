import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should abort with truthy value when op returns false', (done) => {
    let abortCalledWith: any = null;
    const mockRead = (abort: any, cb: (end: any, data?: any) => void) => {
      abortCalledWith = abort;
      cb(true);
    };

    const sink = drain((data: any) => {
      return false;
    }, () => {
      // Done callback
    });

    // Simulate the sink being called with the mock read function
    (sink as any)(mockRead);

    // The abort should be called with a truthy value (true in original, but false in mutant)
    // In the original code, abort || true evaluates to true when abort is false
    // In the mutant code, abort && true evaluates to false when abort is false
    // This test verifies the original behavior where abort is truthy
    setTimeout(() => {
      // In the original code, abortCalledWith should be true (from abort || true)
      // In the mutant code, abortCalledWith would be false (from abort && true)
      if (abortCalledWith === true) {
        done();
      } else {
        done(new Error(`Expected abort to be called with true, but got ${abortCalledWith}`));
      }
    }, 10);
  });
});