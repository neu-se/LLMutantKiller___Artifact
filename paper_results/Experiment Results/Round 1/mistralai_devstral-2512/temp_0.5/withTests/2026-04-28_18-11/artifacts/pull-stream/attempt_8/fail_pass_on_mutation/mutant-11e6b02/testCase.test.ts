const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");

describe('take mutation test', () => {
  it('should detect the last flag mutation in terminate callback', (done) => {
    // Test with last=true option
    const takeStream = take(function(n: number) { return n < 3; }, { last: true });

    let results: number[] = [];
    let callCount = 0;
    let terminateCallCount = 0;
    let dataAfterTerminate = false;

    // Create a mock read function that tracks terminate behavior
    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
      if (end === true) {
        // This is the terminate call
        terminateCallCount++;
        // In original code: last=false in terminate, so no data should be passed
        // In mutated code: last=true in terminate, which might affect behavior
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
            // The mutation changes last=false to last=true in terminate
            // This should affect whether we get data after terminate
            expect(terminateCallCount).toBe(1);
            expect(dataAfterTerminate).toBe(false);
            done();
          } catch (err) {
            done(err);
          }
        } else {
          if (terminateCallCount > 0) {
            dataAfterTerminate = true;
          }
          results.push(data);
          readNext();
        }
      });
    };

    readNext();
  });
});