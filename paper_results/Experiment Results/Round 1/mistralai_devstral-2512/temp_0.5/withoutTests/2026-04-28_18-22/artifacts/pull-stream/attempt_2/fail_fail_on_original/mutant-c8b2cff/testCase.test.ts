const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should pass abort error to read callback when op returns false', (done) => {
    let readCount = 0;
    const mockRead = (end, cb) => {
      readCount++;
      if (readCount === 1) {
        cb(null, 'data');
      } else if (readCount === 2) {
        // Verify that the abort error is passed to read
        expect(end).toBe(true);
        cb(true);
      }
    };

    const mockOp = (data) => {
      return false; // This should trigger the abort path
    };

    const sink = drain(mockOp, () => {
      // This should not be called in this scenario
      done(new Error('done callback should not be called'));
    });

    sink(mockRead);

    // Give time for async operations to complete
    setTimeout(() => {
      done();
    }, 10);
  });
});