const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should call read with abort when not busy and not when busy', (done) => {
    const abortCalls: boolean[] = [];
    const mockMap = (data: unknown, cb: (err: unknown, data: unknown) => void) => {
      setTimeout(() => cb(null, data), 0);
    };
    const mockRead = (abort: unknown, cb: (err: unknown, data?: unknown) => void) => {
      if (abort) {
        abortCalls.push(true);
        cb(abort);
      } else {
        abortCalls.push(false);
        cb(null, 'data');
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    // First call when not busy - should call read with abort
    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      expect(abortCalls).toEqual([true]);

      // Second call when busy - should not call read with abort
      abortCalls.length = 0;
      mockRead(null, (end, data) => {
        if (!end) {
          mappedRead('abort-error', (err: unknown) => {
            expect(err).toBe('abort-error');
            expect(abortCalls).toEqual([]);
            done();
          });
        }
      });
    });
  });
});