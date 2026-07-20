const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should handle abort when not busy', (done) => {
    const mockMap = (data, cb) => cb(null, data);
    const mockRead = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      done();
    });
  });
});