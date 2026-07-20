import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should invoke callback with ended value when ended is true and end is false', (done) => {
    const testFn = () => true;
    const takeStream = take(testFn);
    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(true);
      } else {
        cb(null, 'data');
      }
    });

    const stream = takeStream(mockRead);
    let callbackCount = 0;

    // First call to set ended to true
    stream(true, (end) => {
      // Second call with end=false but ended=true
      stream(false, (result) => {
        callbackCount++;
        expect(result).toBe(true);
        expect(callbackCount).toBe(1);
        done();
      });

      // Verify callback was called exactly once
      setTimeout(() => {
        if (callbackCount !== 1) {
          done(new Error(`Callback called ${callbackCount} times instead of 1 - mutation detected`));
        }
      }, 10);
    });
  });
});