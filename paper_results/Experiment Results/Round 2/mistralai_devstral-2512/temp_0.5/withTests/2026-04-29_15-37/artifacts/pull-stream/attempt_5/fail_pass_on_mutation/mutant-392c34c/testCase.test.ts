import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find error handling', () => {
  it('should pass true as null when stream ends with true', (done) => {
    pull(
      (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) {
          cb(abort);
        } else {
          cb(true); // End stream with true
        }
      },
      find((data: any) => data === 'match', (err: any, result: any) => {
        // Original: cb(err === true ? null : err, null)
        // Mutated: cb(err === false ? null : err, null)
        // When err is true:
        // - Original passes null as first arg
        // - Mutated passes true as first arg
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});