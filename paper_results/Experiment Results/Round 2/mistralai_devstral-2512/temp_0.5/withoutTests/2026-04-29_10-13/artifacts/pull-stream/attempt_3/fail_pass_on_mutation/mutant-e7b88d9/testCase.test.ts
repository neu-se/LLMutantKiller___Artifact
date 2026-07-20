import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should properly handle the ended state when end is false but ended is true', (done) => {
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
    let callbackInvoked = false;

    // First call to set ended to true
    stream(true, (end) => {
      // Second call with end=false but ended=true
      stream(false, (result) => {
        callbackInvoked = true;
        expect(result).toBe(true);
        done();
      });

      // If callback isn't invoked within 50ms, fail the test
      setTimeout(() => {
        if (!callbackInvoked) {
          done(new Error('Callback was not invoked - mutation detected'));
        }
      }, 50);
    });
  });
});