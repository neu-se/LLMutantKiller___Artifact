import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should abort with true when called with a function as first argument', (done) => {
    const error = new Error('test error');
    let abortCalled = false;
    let abortValue: any = null;

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        abortCalled = true;
        abortValue = abort;
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const sink = drain(function (data: any) {
      return false;
    }, function (err: any) {
      // This should not be called with the error when abort is triggered
      if (err && err !== true) {
        done(new Error('Expected abort to be called with true, but got error: ' + err));
      } else {
        // Verify that abort was called with true
        if (abortCalled && abortValue === true) {
          done();
        } else {
          done(new Error('Abort was not called with true'));
        }
      }
    });

    const read = pull(source, sink);
    read(null, function (end: any, data: any) {
      // Trigger abort with a function (which should be treated as callback)
      (sink as any).abort(function (err: any) {
        // This callback should be invoked with true
        if (err === true) {
          // Additional check to ensure the abort was processed correctly
          if (abortCalled && abortValue === true) {
            done();
          } else {
            done(new Error('Abort was not called with true'));
          }
        } else {
          done(new Error('Expected abort callback to be called with true, but got: ' + err));
        }
      });
    });
  });
});