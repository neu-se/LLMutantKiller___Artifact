import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('take mutation test', () => {
  it('should properly handle the ended state when stream ends', (done) => {
    let callCount = 0;
    let secondReadCallback = false;

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
        secondReadCallback = true;
        expect(end2).toBe(true);
        done();
      });
    });

    // Add timeout to detect if second callback is missing (mutated case)
    setTimeout(() => {
      if (!secondReadCallback) {
        done(new Error('Second callback was not called - mutation detected'));
      }
    }, 100);
  });
});