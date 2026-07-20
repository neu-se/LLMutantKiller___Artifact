const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");

describe('take mutation test', () => {
  it('should correctly handle stream termination behavior with last option', (done) => {
    const takeStream = take(function(n: number) { return n < 3; }, { last: true });

    let results: number[] = [];
    let callCount = 0;
    let terminateCalls = 0;

    // Create a mock read function that tracks terminate calls
    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
      if (end === true) {
        // This is the terminate call
        terminateCalls++;
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
            // The original code should call terminate once when last=true
            // The mutated code changes last=false in terminate, which affects behavior
            expect(terminateCalls).toBe(1);
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