import { asyncMap } from './throughs/async-map';

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
    mappedRead(null, (end, data) => {
      // This should not be called due to abort
    });

    // Abort while busy
    const abortError = new Error('aborted');
    mappedRead(abortError, (err) => {
      expect(err).toBe(abortError);
      done();
    });
  });
});