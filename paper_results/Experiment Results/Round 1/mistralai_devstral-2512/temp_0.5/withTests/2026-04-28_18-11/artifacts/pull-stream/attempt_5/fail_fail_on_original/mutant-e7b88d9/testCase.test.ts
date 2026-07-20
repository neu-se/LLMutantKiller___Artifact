import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('take mutation test', () => {
  it('should callback with ended state when stream ends', (done) => {
    let callCount = 0;
    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else if (callCount === 0) {
        callCount++;
        cb(null, 1);
      } else {
        cb(true);
      }
    };

    const read = pull(
      source,
      take(1)
    );

    read(null, (end: any, data: any) => {
      expect(data).toBe(1);
      expect(end).toBeFalsy();

      // Second read should trigger the end case
      read(null, (end2: any, data2: any) => {
        // In original code, this should callback with ended=true
        // In mutated code, this will hang because the callback is missing
        expect(end2).toBe(true);
        done();
      });
    });

    // Add timeout to fail if callback is missing (mutated case)
    setTimeout(() => {
      done(new Error('Callback was not called - mutation detected'));
    }, 100);
  });
});