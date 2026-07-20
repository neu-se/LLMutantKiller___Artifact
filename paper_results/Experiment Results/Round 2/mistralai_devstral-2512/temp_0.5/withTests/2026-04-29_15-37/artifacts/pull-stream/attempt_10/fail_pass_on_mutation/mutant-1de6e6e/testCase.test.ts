import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('reduce sink behavior', () => {
  it('should correctly handle end signal when source ends with true', (done) => {
    const input = [1, 2, 3];
    const reducer = (acc: number, val: number) => acc + val;
    const expectedSum = 6;

    let callbackCalled = false;
    let callbackError: any = null;
    let callbackResult: number | null = null;

    pull(
      values(input),
      reduce(reducer, 0, (err: any, result: number) => {
        callbackCalled = true;
        callbackError = err;
        callbackResult = result;
      })
    );

    // Verify callback was called with correct values
    setTimeout(() => {
      expect(callbackCalled).toBe(true);
      expect(callbackError).toBeNull();
      expect(callbackResult).toBe(expectedSum);
      done();
    }, 100);
  });
});