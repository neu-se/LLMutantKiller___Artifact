import { describe, it, expect } from '@jest/globals';
import take from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take with last:true terminate behavior', () => {
  it('should only terminate the source once after last item is passed', (done) => {
    // Track how many times the source receives an abort signal
    let abortCount = 0;
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    // Create a source that counts aborts
    const source = function(end: any, cb: Function) {
      if (end) {
        abortCount++;
        cb(end);
        return;
      }
      if (i >= values.length) {
        cb(true);
        return;
      }
      cb(null, values[i++]);
    };

    // take while n < 3, with last:true (so 3 is included as the last item)
    const through = take(function(n: number) { return n < 3; }, { last: true });
    const read = through(source);

    const results: number[] = [];

    function doRead() {
      read(null, function(end: any, data: any) {
        if (end) {
          // Stream ended - now do one more read to ensure terminate is not called again
          read(null, function(end2: any, data2: any) {
            // With original: last=false after terminate, so cb(ended) called directly, abortCount stays at 1
            // With mutated: last=true after terminate, so terminate called again, abortCount becomes 2
            expect(abortCount).toBe(1);
            expect(end2).toBeTruthy();
            done();
          });
          return;
        }
        results.push(data);
        doRead();
      });
    }

    doRead();
  });
});