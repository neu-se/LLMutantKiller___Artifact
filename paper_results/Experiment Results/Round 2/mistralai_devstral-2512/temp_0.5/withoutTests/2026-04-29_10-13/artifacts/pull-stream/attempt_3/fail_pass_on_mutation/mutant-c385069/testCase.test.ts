const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should handle abort when not busy by calling read with abort', (done) => {
    let readCalledWithAbort = false;
    const mockMap = (data, cb) => cb(null, data);
    const mockRead = (abort, cb) => {
      if (abort) {
        readCalledWithAbort = true;
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      expect(readCalledWithAbort).toBe(true);
      done();
    });
  });
});