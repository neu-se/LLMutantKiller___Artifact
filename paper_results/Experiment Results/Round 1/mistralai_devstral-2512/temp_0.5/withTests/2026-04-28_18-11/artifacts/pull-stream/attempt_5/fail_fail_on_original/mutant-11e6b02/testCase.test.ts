const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");

describe('take mutation test', () => {
  it('should correctly handle stream termination with last option and verify last flag state', (done) => {
    const takeStream = take(function(n: number) { return n < 3; }, { last: true });

    let results: number[] = [];
    let callCount = 0;
    let lastFlagValue: boolean | undefined;

    // Create a mock read function that captures the last flag state
    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
      if (end === true) {
        // Capture the last flag value when terminate is called
        lastFlagValue = (takeStream as any).last;
        cb(null);
        return;
      }
      if (end) {
        cb(end);
        return;
      }

      callCount++;
      const data = [1, 2, 3, 4, 5][callCount - 1];
      if (data === undefined) {
        cb(true);
      } else {
        cb(null, data);
      }
    };

    const read = takeStream(mockRead);

    // Read all items
    const readNext = () => {
      read(null, (end: any, data: any) => {
        if (end) {
          // Stream ended
          try {
            expect(results).toEqual([1, 2, 3]);
            // The original code should have last=false in terminate callback
            // The mutated code has last=true
            expect(lastFlagValue).toBe(false);
            done();
          } catch (err) {
            done(err);
          }
        } else {
          results.push(data);
          readNext();
        }
      });
    };

    readNext();
  });
});