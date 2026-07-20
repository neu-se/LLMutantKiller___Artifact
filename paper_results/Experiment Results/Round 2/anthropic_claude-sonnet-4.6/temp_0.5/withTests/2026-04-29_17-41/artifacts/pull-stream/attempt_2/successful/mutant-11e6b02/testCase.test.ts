import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take terminate sets last to false', () => {
  it('should abort the source only once when using last:true after stream ends', (done: jest.DoneCallback) => {
    let abortCount = 0;
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    const source = function(end: any, cb: (err: any, data?: any) => void) {
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

    const through = take(function(n: number) { return n < 3; }, { last: true });
    const read = through(source);

    const results: number[] = [];

    function doRead() {
      read(null, function(end: any, data: any) {
        if (end) {
          read(null, function(end2: any) {
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