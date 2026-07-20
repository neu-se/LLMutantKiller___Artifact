const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('drain abort behavior', () => {
  it('should handle abort with function as first argument correctly', (done) => {
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

    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const sink = drain(function (data: any) {
      return false;
    }, function (err: any) {
      if (err && err !== true) {
        done(new Error('Expected abort to be called with true, but got error: ' + err));
      }
    });

    const read = pull(source, sink);
    read(null, function (end: any, data: any) {
      (sink as any).abort(function (err: any) {
        if (err === true) {
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