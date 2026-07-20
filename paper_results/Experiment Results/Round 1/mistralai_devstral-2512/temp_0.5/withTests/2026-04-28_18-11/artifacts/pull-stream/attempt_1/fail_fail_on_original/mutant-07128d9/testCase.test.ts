import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('drain mutation test', () => {
  it('should handle end with truthy non-true value correctly', (done) => {
    const error = new Error('test error');
    let callbackCalled = false;

    const sink = drain(null, (err) => {
      callbackCalled = true;
      expect(err).toBe(error);
      done();
    });

    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    pull(
      source,
      sink
    );
  });
});