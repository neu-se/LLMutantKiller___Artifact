import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should call callback when ended is true and end is false', (done) => {
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
    let callbackCalled = false;

    // First call to set ended to true
    stream(true, (end) => {
      // Second call with end=false but ended=true
      stream(false, (result) => {
        callbackCalled = true;
        expect(result).toBe(true);
        done();
      });

      // Fail if callback isn't called within 10ms
      setTimeout(() => {
        if (!callbackCalled) {
          done(new Error('Callback was not called - mutation detected'));
        }
      }, 10);
    });
  });
});