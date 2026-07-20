import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return a stream that ends when given no array', (done) => {
    const stream = values();
    let ended = false;
    stream(null, (err, value) => {
      if (err) {
        done(err);
      } else if (value === undefined) {
        ended = true;
        done();
      } else {
        done(new Error('Stream did not end'));
      }
    });
    if (!ended) {
      stream(null, () => {
        done(new Error('Stream did not end'));
      });
    }
  });
});