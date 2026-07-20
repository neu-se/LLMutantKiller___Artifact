const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should call read with abort when not busy', (done) => {
    let readAbortCallCount = 0;
    const mockMap = (data, cb) => cb(null, data);
    const mockRead = (abort, cb) => {
      if (abort) {
        readAbortCallCount++;
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    // First call when not busy
    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      expect(readAbortCallCount).toBe(1);

      // Second call when busy (should not call read with abort)
      readAbortCallCount = 0;
      mockMap('data', () => {
        mappedRead('abort-error', (err: unknown) => {
          expect(err).toBe('abort-error');
          expect(readAbortCallCount).toBe(0);
          done();
        });
      });
    });
  });
});