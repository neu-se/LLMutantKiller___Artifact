import take from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take with last option', () => {
  it('should only abort the upstream source once after stream ends with last:true', (done) => {
    let abortCount = 0;
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        abortCount++;
        cb(abort);
      } else if (i < values.length) {
        cb(null, values[i++]);
      } else {
        cb(true);
      }
    }

    // take while n < 3, include last (so collects 1, 2, 3)
    const through = take((n: number) => n < 3, { last: true });
    const read = through(source);

    read(null, (_end1: any, _data1: any) => {
      // got 1
      read(null, (_end2: any, _data2: any) => {
        // got 2
        read(null, (_end3: any, _data3: any) => {
          // got 3 (last item, test failed but included)
          // Now ended=true, last=true
          // This read triggers terminate -> aborts upstream (abortCount becomes 1)
          read(null, (end4: any, _data4: any) => {
            expect(end4).toBeTruthy();
            const abortCountAfterFirstTerminate = abortCount;
            expect(abortCountAfterFirstTerminate).toBe(1);

            // In original: last is now false, so this just calls cb(ended) - no new abort
            // In mutated: last is still true, so terminate is called again - abortCount becomes 2
            read(null, (end5: any, _data5: any) => {
              expect(end5).toBeTruthy();
              // Original: abortCount still 1
              // Mutated: abortCount is 2
              expect(abortCount).toBe(1);
              done();
            });
          });
        });
      });
    });
  });
});