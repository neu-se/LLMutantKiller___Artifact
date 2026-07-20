import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should call callback with ended value when ended is true and end is false', (done) => {
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
    let callbackResult: any;

    // First call to set ended to true
    stream(true, (end) => {
      // Second call with end=false but ended=true
      stream(false, (result) => {
        callbackCalled = true;
        callbackResult = result;
      });

      // Check after a small delay
      setTimeout(() => {
        if (!callbackCalled) {
          done(new Error('Callback was not called - mutation detected'));
        } else {
          expect(callbackResult).toBe(true);
          done();
        }
      }, 10);
    });
  });
});