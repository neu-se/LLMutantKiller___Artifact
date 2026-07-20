import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain mutation test', () => {
  it('should handle true end value correctly', (done) => {
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    let callbackCalled = false;

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        cb(true);
      }
    };

    const sink = drain(null, (err: any) => {
      callbackCalled = true;
      expect(err).toBeNull();
      done();
    });

    pull(source, sink);

    setTimeout(() => {
      if (!callbackCalled) {
        done(new Error('Callback was not called'));
      }
    }, 100);
  });
});