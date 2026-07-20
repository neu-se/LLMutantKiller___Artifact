import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should call the read function when aborting and not busy', (done) => {
    const readSpy = jest.fn((abort, cb) => {
      if (abort) {
        cb(new Error('Aborted'));
      } else {
        cb(null, null, 'data');
      }
    });

    const asyncMapper = asyncMap((data, cb) => {
      cb(null, data);
    });

    const next = asyncMapper(readSpy);

    next(null, () => {});

    next(true, (err) => {
      expect(readSpy).toHaveBeenCalledTimes(2);
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Aborted');
      done();
    });
  });
});