import { count } from '../../../sources/count';

describe('count function', () => {
  it('should return the correct count when end is true', (done) => {
    const stream = count(5);
    let counter = 0;
    stream(null, (end: any, data: any) => {
      if (end === true) {
        done();
      } else {
        counter++;
        if (counter === 5) {
          stream(true, () => {
            done();
          });
        }
      }
    });
  });
});