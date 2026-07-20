import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', (done) => {
    const source = pull.values([1, 2, 3, new Error('test error')]);
    const read = pull.drain((data: any) => {
      return true;
    });
    read(source, (err: any) => {
      if (err) {
        done();
      } else {
        done.fail('Expected an error');
      }
    });
  });
});