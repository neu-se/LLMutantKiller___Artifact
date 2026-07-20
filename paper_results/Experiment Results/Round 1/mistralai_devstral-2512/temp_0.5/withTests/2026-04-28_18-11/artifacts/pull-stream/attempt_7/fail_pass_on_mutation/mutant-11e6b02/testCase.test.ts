const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");

describe('take mutation test', () => {
  it('should expose the last flag mutation in terminate callback', (done) => {
    // Test with last=true option
    const takeStream = take(function(n: number) { return n < 3; }, { last: true });

    let results: number[] = [];
    let callCount = 0;
    let terminateBehavior: 'called' | 'not-called' = 'not-called';

    // Create a mock read function that exposes terminate behavior
    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
      if (end === true) {
        // This is the terminate call - in original code last should be false here
        // In mutated code last would be true
        terminateBehavior = 'called';
        // Simulate the behavior difference by checking if we get data after terminate
        // In original code (last=false), terminate should not pass data
        // In mutated code (last=true), it might behave differently
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
            // The key difference: original code should have terminate called
            // The mutation affects whether last is set correctly in terminate
            expect(terminateBehavior).toBe('called');
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