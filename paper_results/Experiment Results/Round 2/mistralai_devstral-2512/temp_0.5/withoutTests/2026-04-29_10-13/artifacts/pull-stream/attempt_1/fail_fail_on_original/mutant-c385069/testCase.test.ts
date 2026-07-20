import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap abort handling', () => {
  it('should handle abort when not busy', (done) => {
    const mockMap = jest.fn((data, cb) => cb(null, data));
    const mockRead = jest.fn((abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    });

    const mappedRead = asyncMap(mockMap)(mockRead);

    mappedRead('abort-error', (err) => {
      expect(err).toBe('abort-error');
      expect(mockRead).toHaveBeenCalledWith('abort-error', expect.any(Function));
      done();
    });
  });
});