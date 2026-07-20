import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return a stream that ends when given null', (done) => {
    const stream = values(null);
    let ended = false;
    stream(null, (err: any, value: any) => {
      if (err) {
        done(err);
      } else if (value === undefined) {
        ended = true;
      } else {
        done(new Error('Stream did not end'));
      }
    });
    if (!ended) {
      stream(null, () => {
        done(new Error('Stream did not end'));
      });
    }
    done();
  });
});