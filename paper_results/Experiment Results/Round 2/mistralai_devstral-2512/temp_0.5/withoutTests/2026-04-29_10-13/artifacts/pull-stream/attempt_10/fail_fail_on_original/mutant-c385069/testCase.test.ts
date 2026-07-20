const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should immediately call read with abort when not busy and not when busy', (done) => {
    const callLog: string[] = [];
    const mockMap = (data: unknown, cb: (err: unknown, data: unknown) => void) => {
      callLog.push('map-start');
      setTimeout(() => {
        callLog.push('map-end');
        cb(null, data);
      }, 0);
    };
    const mockRead = (abort: unknown, cb: (err: unknown, data?: unknown) => void) => {
      if (abort) {
        callLog.push('read-abort');
        cb(abort);
      } else {
        callLog.push('read-normal');
        cb(null, 'data');
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    // First abort when not busy
    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      expect(callLog).toEqual(['read-abort']);

      // Second abort when busy
      callLog.length = 0;
      mockRead(null, (end, data) => {
        if (!end) {
          mappedRead('abort-error', (err: unknown) => {
            expect(err).toBe('abort-error');
            expect(callLog).toEqual(['map-start', 'read-normal', 'map-end']);
            done();
          });
        }
      });
    });
  });
});