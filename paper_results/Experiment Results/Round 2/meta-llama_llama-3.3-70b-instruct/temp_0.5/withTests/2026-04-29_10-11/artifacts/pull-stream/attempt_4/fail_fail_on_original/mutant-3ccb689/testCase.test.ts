import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('async-map', () => {
  it('should abort when map function throws an error', (done) => {
    const source = pull.values([1, 2, 3]);
    const asyncMapStream = pull.asyncMap((data: any, cb: (err: Error | null, data: any) => void) => {
      if (data === 2) {
        cb(new Error('Test error'));
      } else {
        cb(null, data);
      }
    });
    const read = pull(
      source,
      asyncMapStream
    );
    read(true, (end: any, data: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});