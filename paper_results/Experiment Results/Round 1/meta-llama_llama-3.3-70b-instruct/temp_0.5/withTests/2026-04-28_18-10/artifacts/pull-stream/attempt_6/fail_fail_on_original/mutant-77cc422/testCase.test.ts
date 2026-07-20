import { count } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js';

describe('count function', () => {
  it('should call cb with next value when end is false', (done) => {
    let i = 0;
    count(10)(null, (end, data) => {
      if (end === true) {
        if (i !== 10) {
          done(new Error('Expected to count to 10'));
        } else {
          done();
        }
      } else if (end) {
        done(end);
      } else {
        i++;
        if (data !== i - 1) {
          done(new Error('Expected data to be ' + (i - 1)));
        }
      }
    });
  });
});