const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap mutation test', () => {
  it('should immediately callback with aborted error when aborted before read completes', (done) => {
    let readCallback: (end: any, data?: any) => void;
    const mockRead = jest.fn((abort, cb) => {
      readCallback = cb;
      // Don't call callback immediately to simulate async operation
    });

    const mockMap = jest.fn((data, cb) => {
      // Simulate async mapping
      setTimeout(() => cb(null, data), 10);
    });

    const mappedRead = asyncMap(mockMap)(mockRead);

    // Start a read operation
    mappedRead(null, (end: any, data: any) => {
      // This should not be called due to abort
      done('Should not reach here');
    });

    // Abort before the read completes
    const abortError = new Error('aborted');
    mappedRead(abortError, (err: any) => {
      expect(err).toBe(abortError);

      // Now trigger the original read callback to verify it doesn't interfere
      readCallback!(null, 'data');

      // Give time for any potential incorrect callbacks
      setTimeout(done, 50);
    });
  });
});