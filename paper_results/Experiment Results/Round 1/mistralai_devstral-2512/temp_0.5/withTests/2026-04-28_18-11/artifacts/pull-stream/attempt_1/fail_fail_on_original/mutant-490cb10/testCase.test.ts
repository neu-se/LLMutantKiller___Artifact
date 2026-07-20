import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain without done callback', () => {
  it('should throw an error when no done callback is provided and stream ends with error', (done) => {
    const error = new Error('test error');
    const source = pull.values([1, 2, 3]);
    const errorSource = pull(
      source,
      pull.asyncMap((data, cb) => {
        if (data === 3) {
          cb(error);
        } else {
          cb(null, data);
        }
      })
    );

    const sink = drain(null);

    pull(
      errorSource,
      sink
    );

    // The test expects the sink to throw an error when no done callback is provided
    // and the stream ends with an error. This behavior is missing in the mutated code.
    setTimeout(() => {
      done.fail('Expected an error to be thrown');
    }, 100);
  });
});