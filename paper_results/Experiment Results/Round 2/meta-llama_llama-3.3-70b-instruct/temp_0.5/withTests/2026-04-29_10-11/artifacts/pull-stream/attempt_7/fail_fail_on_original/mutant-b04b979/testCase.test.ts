import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('asyncMap', () => {
  it('should pass through data when map function returns it', (done) => {
    const source = pull.values([1, 2, 3]);
    const asyncMapStream = pull(asyncMap(function (data: any, cb: (err: any, data: any) => void) {
      cb(null, data);
    }));

    pull(
      source,
      asyncMapStream,
      pull.collect((err: any, data: any) => {
        if (err) {
          done.fail('Error occurred');
        } else {
          expect(data).toEqual([1, 2, 3]);
          done();
        }
      })
    );
  });
});