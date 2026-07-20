import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should properly handle ended state when end is false but ended is true', (done) => {
    const testFn = () => true;
    const takeStream = take(testFn);
    let callCount = 0;
    let endedState = false;

    const mockRead = jest.fn((end: boolean, cb: (end: boolean | null, data?: any) => void) => {
      if (end) {
        endedState = true;
        cb(true);
      } else {
        callCount++;
        if (callCount === 1) {
          cb(null, 'data');
        } else {
          cb(null, 'more data');
        }
      }
    });

    const stream = takeStream(mockRead);

    // First call to establish normal flow
    stream(false, (end: boolean | null, data?: any) => {
      expect(end).toBeFalsy();
      expect(data).toBe('data');

      // Force ended to be true
      stream(true, (endResult: boolean) => {
        expect(endResult).toBe(true);
        endedState = true;

        // Now call with end=false to trigger the mutation
        // The original code should call cb(ended) which is cb(true)
        // The mutated code does nothing
        let callbackCalled = false;
        stream(false, (endResult2: boolean | null, data2?: any) => {
          callbackCalled = true;
          expect(endResult2).toBe(true);
        });

        // Check if callback was called
        setTimeout(() => {
          if (!callbackCalled) {
            done(new Error('Callback was not called - mutation detected'));
          } else {
            done();
          }
        }, 10);
      });
    });
  });
});