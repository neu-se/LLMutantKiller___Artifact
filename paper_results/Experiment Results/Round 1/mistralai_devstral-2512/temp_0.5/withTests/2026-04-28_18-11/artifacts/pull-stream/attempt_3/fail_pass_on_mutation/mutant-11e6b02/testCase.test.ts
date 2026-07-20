const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");

describe('take mutation test', () => {
  it('should correctly handle stream termination with last option', (done) => {
    const takeStream = take(function(n: number) { return n < 3; }, { last: true });

    let results: number[] = [];
    let callCount = 0;

    // Create a mock read function that simulates a stream
    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
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
            // With last=true, we should get [1,2,3] (3 is the first item that fails the test)
            expect(results).toEqual([1, 2, 3]);
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