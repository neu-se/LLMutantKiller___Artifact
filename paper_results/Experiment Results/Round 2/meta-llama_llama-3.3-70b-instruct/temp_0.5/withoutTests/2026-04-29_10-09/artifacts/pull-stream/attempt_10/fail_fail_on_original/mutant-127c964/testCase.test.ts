import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return a stream that yields values when given an object and then ends', (done) => {
    const obj = { a: 1, b: 2, c: 3 };
    const stream = values(obj);
    let count = 0;
    stream(null, (err: any, value: any) => {
      if (err) {
        done(err);
      } else if (value === undefined) {
        if (count !== Object.keys(obj).length) {
          done(new Error('Stream did not yield all values'));
        } else {
          stream(null, (err: any, value: any) => {
            if (value !== undefined) {
              done(new Error('Stream did not end'));
            } else {
              done();
            }
          });
        }
      } else {
        count++;
      }
    });
  });
});