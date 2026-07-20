const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap mutation test', () => {
  it('should immediately callback with aborted error when already aborted', (done) => {
    const mockMap = jest.fn((data, cb) => cb(null, data));
    const mockRead = jest.fn((abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    });

    const mappedRead = asyncMap(mockMap)(mockRead);

    // First call to establish aborted state
    const abortError = new Error('aborted');
    mappedRead(abortError, (err: any) => {
      // This callback should be called immediately with the abort error
      expect(err).toBe(abortError);

      // Now try to read again - should immediately return the aborted error
      mappedRead(null, (end: any, data: any) => {
        expect(end).toBe(abortError);
        done();
      });
    });
  });
});