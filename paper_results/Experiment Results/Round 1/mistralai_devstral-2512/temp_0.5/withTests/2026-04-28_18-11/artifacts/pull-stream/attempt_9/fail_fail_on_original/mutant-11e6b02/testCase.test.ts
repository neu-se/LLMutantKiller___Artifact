const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");

describe('take mutation test', () => {
  it('should expose the last flag mutation through callback timing', (done) => {
    const takeStream = take(function(n: number) { return n < 3; }, { last: true });

    let results: number[] = [];
    let callCount = 0;
    let callbacksAfterTerminate = 0;

    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
      if (end === true) {
        // Terminate was called
        // In original: last=false, so no more data callbacks
        // In mutated: last=true, which might allow more callbacks
        setTimeout(() => cb(null), 0);
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
    let terminateCalled = false;

    const readNext = () => {
      read(null, (end: any, data: any) => {
        if (terminateCalled) {
          callbacksAfterTerminate++;
        }
        if (end) {
          try {
            expect(results).toEqual([1, 2, 3]);
            // Original code should have exactly 0 callbacks after terminate
            // Mutated code might have more due to last=true
            expect(callbacksAfterTerminate).toBe(0);
            done();
          } catch (err) {
            done(err);
          }
        } else {
          results.push(data);
          if (data === 3) {
            terminateCalled = true;
          }
          readNext();
        }
      });
    };

    readNext();
  });
});