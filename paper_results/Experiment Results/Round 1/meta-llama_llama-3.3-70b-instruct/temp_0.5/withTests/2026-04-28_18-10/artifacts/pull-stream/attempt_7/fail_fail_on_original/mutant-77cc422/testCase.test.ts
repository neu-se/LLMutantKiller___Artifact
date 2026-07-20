import * as pull from '../../..';

describe('count function', () => {
  it('should call cb with next value when end is false', (done) => {
    const read = pull(
      pull.count(10),
      pull.take(1),
      pull.collect((err, ary) => {
        if (err) {
          done(err);
        } else if (ary.length !== 1) {
          done(new Error('Expected array length to be 1'));
        } else if (ary[0] !== 0) {
          done(new Error('Expected first element to be 0'));
        } else {
          done();
        }
      })
    );
    read(null, () => {});
  });

  it('should call cb with end when end is true', (done) => {
    const read = pull(
      pull.count(10),
      pull.take(1),
      pull.collect((err, ary) => {
        if (err) {
          done(err);
        } else if (ary.length !== 1) {
          done(new Error('Expected array length to be 1'));
        } else if (ary[0] !== 0) {
          done(new Error('Expected first element to be 0'));
        } else {
          done();
        }
      })
    );
    read(true, () => {});
  });
});