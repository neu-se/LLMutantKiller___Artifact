import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find error handling', () => {
  it('should distinguish between true and false error values', (done) => {
    pull(
      (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) {
          cb(abort);
        } else {
          cb(true); // End stream with true error
        }
      },
      find((data: any) => data === 'match', (err: any, result: any) => {
        // Original: cb(err === true ? null : err, null)
        // Mutated: cb(err === false ? null : err, null)
        // When err is true:
        // - Original passes null as first arg
        // - Mutated passes true as first arg
        expect(err).toBeNull(); // Will fail on mutated code where err === true
        expect(result).toBeNull();
        done();
      })
    );
  });
});