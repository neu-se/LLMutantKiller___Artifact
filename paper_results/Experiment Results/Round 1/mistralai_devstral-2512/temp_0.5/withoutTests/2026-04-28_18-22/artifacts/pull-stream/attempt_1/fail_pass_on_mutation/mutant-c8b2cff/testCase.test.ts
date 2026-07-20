const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should call done with abort error when op returns false', (done) => {
    let readCount = 0;
    const mockRead = (end, cb) => {
      readCount++;
      if (readCount === 1) {
        cb(null, 'data');
      } else if (readCount === 2) {
        cb(true); // Simulate end
      }
    };

    const mockOp = (data) => {
      return false; // This should trigger the abort path
    };

    const mockDone = (err) => {
      expect(err).toBe(true); // Should receive the abort error
      done();
    };

    const sink = drain(mockOp, mockDone);
    sink(mockRead);
  });
});