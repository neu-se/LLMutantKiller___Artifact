const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should call read with abort exactly once when not busy', (done) => {
    let readAbortCallCount = 0;
    const mockMap = (data: unknown, cb: (err: unknown, data: unknown) => void) => {
      cb(null, data);
    };
    const mockRead = (abort: unknown, cb: (err: unknown) => void) => {
      if (abort) {
        readAbortCallCount++;
        cb(abort);
      } else {
        cb(null);
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      expect(readAbortCallCount).toBe(1);
      done();
    });
  });
});