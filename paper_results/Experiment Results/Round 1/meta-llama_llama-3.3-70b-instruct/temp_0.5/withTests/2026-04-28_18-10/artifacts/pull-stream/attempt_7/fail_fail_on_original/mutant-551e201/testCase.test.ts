import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';
import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', (done) => {
    const source = values([1, 2, 3, new Error('test error')]);
    pull(
      source,
      drain((data: any) => {
        return true;
      }, (err: any) => {
        if (err) {
          done();
        } else {
          done.fail('Expected an error');
        }
      })
    );
  });
});