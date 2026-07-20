import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should properly handle the ended state when end is false but ended is true', (done) => {
    const testFn = () => true;
    const takeStream = take(testFn);
    let firstCall = true;

    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(true);
      } else {
        if (firstCall) {
          firstCall = false;
          cb(null, 'data');
        } else {
          // Simulate a case where we want to check the ended state
          cb(null, 'more data');
        }
      }
    });

    const stream = takeStream(mockRead);

    // First call to establish normal flow
    stream(false, (end, data) => {
      expect(end).toBeFalsy();
      expect(data).toBe('data');

      // Force ended to be true
      stream(true, (endResult) => {
        expect(endResult).toBe(true);

        // Now call with end=false to trigger the mutation
        // The original code should call cb(ended) which is cb(true)
        // The mutated code does nothing, so the callback won't be called
        const startTime = Date.now();
        stream(false, (endResult2, data2) => {
          const elapsed = Date.now() - startTime;
          expect(elapsed).toBeLessThan(100); // Should be called immediately
          expect(endResult2).toBe(true);
          done();
        });

        // Set timeout to fail if callback isn't called (would happen with mutation)
        setTimeout(() => {
          done(new Error('Callback was not called - mutation detected'));
        }, 100);
      });
    });
  });
});