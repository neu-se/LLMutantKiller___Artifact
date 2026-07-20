import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should call the read function when aborting and not busy', (done) => {
    const readSpy = jest.fn((abort: any, cb: any) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, null, 'data');
      }
    });

    const asyncMapper = asyncMap((data: any, cb: any) => {
      cb(null, data);
    });

    const next = asyncMapper(readSpy);

    next(null, () => {});

    next(true, (err: any) => {
      expect(readSpy).toHaveBeenCalledTimes(2);
      next(null, (err: any) => {
        expect(readSpy).toHaveBeenCalledTimes(2);
        done();
      });
    });
  });
});