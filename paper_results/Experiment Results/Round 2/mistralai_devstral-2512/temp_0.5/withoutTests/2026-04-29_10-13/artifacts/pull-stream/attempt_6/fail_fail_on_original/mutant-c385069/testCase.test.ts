const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should call read with abort when not busy and not call it again when busy', (done) => {
    let readCallCount = 0;
    const mockMap = (data, cb) => {
      setTimeout(() => cb(null, data), 10);
    };
    const mockRead = (abort, cb) => {
      readCallCount++;
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    // First abort when not busy
    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      expect(readCallCount).toBe(1);

      // Second abort when busy (should not call read again)
      readCallCount = 0;
      mockRead(null, (end, data) => {
        if (!end) {
          mappedRead('abort-error', (err: unknown) => {
            expect(err).toBe('abort-error');
            expect(readCallCount).toBe(0);
            done();
          });
        }
      });
    });
  });
});