import { count } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js';
import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';
import { collect } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js';

describe('count function', () => {
  it('should call cb with next value when end is false', (done) => {
    let i = 0;
    count(10)(null, (end, data) => {
      if (end === true) {
        done();
      } else if (end) {
        done(end);
      } else {
        i++;
        if (i === 10) {
          done(new Error('Expected end to be true'));
        }
      }
    });
  });
});