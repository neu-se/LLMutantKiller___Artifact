import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap mutation test', () => {
  it('should handle aborted state correctly', (done) => {
    const mockMap = jest.fn((data, cb) => cb(null, data));
    const mockRead = jest.fn((abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    });

    const mappedRead = asyncMap(mockMap)(mockRead);

    // First call to establish busy state
    mappedRead(null, (end: any, data: any) => {
      // This should not be called due to abort
    });

    // Abort while busy
    const abortError = new Error('aborted');
    mappedRead(abortError, (err: any) => {
      expect(err).toBe(abortError);
      done();
    });
  });
});