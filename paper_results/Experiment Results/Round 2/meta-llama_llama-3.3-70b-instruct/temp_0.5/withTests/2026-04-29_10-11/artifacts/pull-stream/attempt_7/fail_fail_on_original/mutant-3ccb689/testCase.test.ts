import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('async-map', () => {
  it('should abort when map function throws an error', (done) => {
    const source = pull(
      pull.values([1, 2, 3]),
      pull.asyncMap((data: any, cb: (err: Error | null, data: any) => void) => {
        if (data === 2) {
          cb(new Error('Test error'), null);
        } else {
          cb(null, data);
        }
      })
    );
    source(true, (end: any, data: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});