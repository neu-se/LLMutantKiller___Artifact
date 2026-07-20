import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain with error handling', () => {
  it('should handle error correctly when end is an error object', (done) => {
    const error = new Error('test error');
    let errorHandled = false;

    const source = function (abort, cb) {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, (err) => {
      errorHandled = true;
      expect(err).toBe(error);
      done();
    });

    pull(source, sink);

    setTimeout(() => {
      if (!errorHandled) {
        done(new Error('Error was not handled correctly'));
      }
    }, 100);
  });
});