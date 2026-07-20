import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return a stream that yields values when given an array', (done) => {
    const array = [1, 2, 3];
    const stream = values(array);
    let count = 0;
    stream(null, (err: any, value: any) => {
      if (err) {
        done(err);
      } else if (value === undefined) {
        if (count !== array.length) {
          done(new Error('Stream did not yield all values'));
        } else {
          done();
        }
      } else {
        count++;
      }
    });
  });
});