const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should immediately call read with abort when not busy', (done) => {
    let readAbortCalled = false;
    const mockMap = (data: unknown, cb: (err: unknown, data: unknown) => void) => {
      cb(null, data);
    };
    const mockRead = (abort: unknown, cb: (err: unknown) => void) => {
      if (abort) {
        readAbortCalled = true;
        cb(abort);
      } else {
        cb(null);
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      expect(readAbortCalled).toBe(true);
      done();
    });
  });
});