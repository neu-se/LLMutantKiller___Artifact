import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('drain', () => {
  it('should call done with error when end is not true and done is provided', (done) => {
    values([1, 2, 3])(
      drain((data: any) => {
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