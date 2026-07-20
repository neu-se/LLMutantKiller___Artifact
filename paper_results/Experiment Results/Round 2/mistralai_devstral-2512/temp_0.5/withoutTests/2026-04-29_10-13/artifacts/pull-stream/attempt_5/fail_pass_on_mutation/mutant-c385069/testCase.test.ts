const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort handling', () => {
  it('should immediately call read with abort when not busy', (done) => {
    const callOrder: string[] = [];
    const mockMap = (data, cb) => {
      callOrder.push('map');
      cb(null, data);
    };
    const mockRead = (abort, cb) => {
      if (abort) {
        callOrder.push('read-abort');
        cb(abort);
      } else {
        callOrder.push('read-normal');
        cb(null, 'data');
      }
    };

    const mappedRead = asyncMap(mockMap)(mockRead);

    mappedRead('abort-error', (err: unknown) => {
      expect(err).toBe('abort-error');
      expect(callOrder).toEqual(['read-abort']);
      done();
    });
  });
});