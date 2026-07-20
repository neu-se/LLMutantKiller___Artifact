import { describe, it, expect } from '@jest/globals';
import take from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take with last option - terminate sets last to false', () => {
  it('should not call terminate multiple times after stream ends with last:true', (done) => {
    // Track how many times the source is aborted
    let abortCount = 0;
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    // Create a source that tracks abort calls
    function source(abort: any, cb: Function) {
      if (abort) {
        abortCount++;
        cb(abort);
      } else if (i < values.length) {
        cb(null, values[i++]);
      } else {
        cb(true);
      }
    }

    // take while n < 3 (so 1, 2 pass, 3 fails but is included as last)
    const through = take((n: number) => n < 3, { last: true });
    const read = through(source);

    // Read first item: 1
    read(null, (end1: any, data1: any) => {
      expect(end1).toBeFalsy();
      expect(data1).toBe(1);

      // Read second item: 2
      read(null, (end2: any, data2: any) => {
        expect(end2).toBeFalsy();
        expect(data2).toBe(2);

        // Read third item: 3 (this is the "last" item, test fails but included)
        read(null, (end3: any, data3: any) => {
          expect(end3).toBeFalsy();
          expect(data3).toBe(3);

          // At this point, ended=true, last=true
          // First termination read: should call terminate once
          read(null, (end4: any, _data4: any) => {
            expect(end4).toBeTruthy();

            // In original: last is now false, so this read calls cb(ended) directly
            // In mutated: last is still true, so this read calls terminate AGAIN (second abort)
            const abortCountAfterFirstEnd = abortCount;

            // Second read after end
            read(null, (end5: any, _data5: any) => {
              expect(end5).toBeTruthy();

              // In original: abortCount should not have increased (last=false, no new terminate)
              // In mutated: abortCount would have increased (last=true, terminate called again)
              expect(abortCount).toBe(abortCountAfterFirstEnd);
              done();
            });
          });
        });
      });
    });
  });
});