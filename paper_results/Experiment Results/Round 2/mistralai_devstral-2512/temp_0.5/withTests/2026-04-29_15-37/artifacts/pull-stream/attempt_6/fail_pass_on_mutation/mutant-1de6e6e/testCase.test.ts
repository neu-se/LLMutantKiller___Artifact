import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('reduce sink behavior', () => {
  it('should correctly handle end signal when source ends with true', (done) => {
    const input = [1, 2, 3];
    const reducer = (acc: number, val: number) => acc + val;
    const expectedSum = 6;

    const source = values(input);
    let readCount = 0;

    pull(
      {
        source: (end: any, cb: any) => {
          readCount++;
          if (readCount === 4) {
            // Force end with true on 4th read
            cb(true);
          } else {
            source(end, cb);
          }
        }
      },
      reduce(reducer, 0, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(expectedSum);
        done();
      })
    );
  });
});