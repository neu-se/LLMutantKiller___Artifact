import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should call callback with ended value when ended is true and end is false', (done) => {
    const testFn = () => true;
    const takeStream = take(testFn);
    let callbackCalled = false;

    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(true);
      } else {
        cb(null, 'data');
      }
    });

    const stream = takeStream(mockRead);

    // First call to set ended to true
    stream(true, (end) => {
      // Second call with end=false but ended=true should trigger the placeholder code
      stream(false, (result) => {
        callbackCalled = true;
        // In original code, this should call cb(ended) which is cb(true)
        // In mutated code, this does nothing, so callback won't be called
        expect(callbackCalled).toBe(true);
        expect(result).toBe(true);
        done();
      });

      // Fail test if callback isn't called within a reasonable time
      setTimeout(() => {
        if (!callbackCalled) {
          done.fail(new Error('Callback was not called - mutation detected'));
        }
      }, 100);
    });
  });
});