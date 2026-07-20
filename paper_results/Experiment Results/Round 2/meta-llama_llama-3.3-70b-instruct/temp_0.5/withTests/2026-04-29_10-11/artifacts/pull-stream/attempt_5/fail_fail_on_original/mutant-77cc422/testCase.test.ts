import * as pull from '../..';

describe('count function', () => {
  it('should return the correct count when end is true', (done) => {
    const source = pull(
      pull.count(5)
    );
    let count = 0;
    source(null, (end, data) => {
      if (end) {
        if (count!== 5) {
          throw new Error('Count is not 5');
        }
        done();
      } else {
        count++;
        source(null, (end, data) => {
          if (end) {
            if (count!== 5) {
              throw new Error('Count is not 5');
            }
            done();
          }
        });
      }
    });
  });
});