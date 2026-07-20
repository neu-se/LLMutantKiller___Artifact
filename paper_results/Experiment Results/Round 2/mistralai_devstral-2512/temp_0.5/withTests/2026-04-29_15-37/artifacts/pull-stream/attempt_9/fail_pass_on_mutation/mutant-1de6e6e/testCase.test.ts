import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('reduce sink behavior', () => {
  it('should correctly handle end signal when source ends with true', (done) => {
    const input = [1, 2, 3];
    const reducer = (acc: number, val: number) => acc + val;
    const expectedSum = 6;

    let callbackCalled = false;

    pull(
      values(input),
      reduce(reducer, 0, (err: any, result: number) => {
        callbackCalled = true;
        expect(err).toBeNull();
        expect(result).toBe(expectedSum);
      })
    );

    // Verify callback was called
    setTimeout(() => {
      expect(callbackCalled).toBe(true);
      done();
    }, 100);
  });
});