import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('find error handling', () => {
  it('should pass error when stream ends with error', (done) => {
    const error = new Error('test error');
    pull(
      pull.values([1, 2, 3]),
      pull.asyncMap((data, cb) => {
        if (data === 2) {
          cb(error);
        } else {
          cb(null, data);
        }
      }),
      find(null, (err, result) => {
        expect(err).toBe(error);
        expect(result).toBeNull();
        done();
      })
    );
  });
});