import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should properly handle ended state with last option', (done) => {
    const testFn = (data: any) => data !== 'stop';
    const takeStream = take(testFn, { last: true });
    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(true);
      } else {
        cb(null, 'stop');
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
        done();
      });

      // Verify callback was called
      setTimeout(() => {
        if (callbackCount === 0) {
          done(new Error('Callback was not called - mutation detected'));
        }
      }, 10);
    });
  });
});