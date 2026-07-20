const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");

describe('take mutation test', () => {
  it('should detect the last flag mutation through stream behavior', (done) => {
    const takeStream = take(function(n: number) { return n < 3; }, { last: true });

    let results: number[] = [];
    let callCount = 0;
    let terminateCalled = false;
    let finalCallbackCount = 0;

    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
      if (end === true) {
        terminateCalled = true;
        // In original: last=false in terminate, so should callback with true
        // In mutated: last=true in terminate, which changes behavior
        cb(true);
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

    const readNext = () => {
      read(null, (end: any, data: any) => {
        if (terminateCalled) {
          finalCallbackCount++;
        }
        if (end) {
          try {
            expect(results).toEqual([1, 2, 3]);
            // Original code should have exactly 1 final callback (with true)
            // Mutated code might have different count due to last=true
            expect(finalCallbackCount).toBe(1);
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