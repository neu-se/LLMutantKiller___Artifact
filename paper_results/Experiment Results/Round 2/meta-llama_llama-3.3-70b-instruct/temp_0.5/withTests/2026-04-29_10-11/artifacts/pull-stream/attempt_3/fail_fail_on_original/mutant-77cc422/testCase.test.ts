import * as pull from '../..';

describe('count function', () => {
  it('should return the correct count when end is true', (done) => {
    const stream = pull(
      pull.count(5),
      pull.drain((data: any) => {
        expect(data).toBeLessThan(5);
      }, () => {
        done();
      })
    );
    stream();
  });
});