import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find error handling', () => {
  it('should pass true as null in callback when stream ends without finding match', (done) => {
    const testError = true;

    pull(
      (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) {
          cb(abort);
        } else {
          cb(true); // End stream without matching data
        }
      },
      find((data: any) => data === 'match', (err: any, result: any) => {
        // Original code: cb(err === true ? null : err, null)
        // Mutated code: cb(err === false ? null : err, null)
        // For err === true, original passes null, mutated passes true
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});