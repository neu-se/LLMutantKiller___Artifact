import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find error handling', () => {
  it('should handle true error value differently from false', (done) => {
    const testValues = [true, false];
    let testCount = 0;

    pull(
      (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) {
          cb(abort);
        } else {
          cb(testValues[testCount]); // Test both true and false
        }
      },
      find((data: any) => data === 'match', (err: any, result: any) => {
        // Original: cb(err === true ? null : err, null)
        // Mutated: cb(err === false ? null : err, null)
        // When err is true:
        // - Original passes null as first arg
        // - Mutated passes true as first arg
        if (testCount === 0) {
          expect(err).toBeNull(); // For true
        } else {
          expect(err).toBe(false); // For false
        }
        expect(result).toBeNull();
        testCount++;
        if (testCount === 2) {
          done();
        }
      })
    );
  });
});