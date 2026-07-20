import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('drain', () => {
  it('should call done with error when end is not true and done is provided', (done) => {
    const read = pull(
      pull.values([1, 2, 3]),
      pull.drain((data: any) => {
        if (data === 2) {
          throw new Error('Test error');
        }
      }, (err: any) => {
        if (err) {
          done();
        } else {
          done(new Error('Expected error was not thrown'));
        }
      })
    );
  });
});