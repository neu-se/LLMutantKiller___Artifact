import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should throw an error when given an object with if(true) condition', (done) => {
    const obj = { a: 1, b: 2, c: 3 };
    const stream = values(obj);
    let count = 0;
    stream(null, (err: any, value: any) => {
      if (err) {
        done(err);
      } else if (value === undefined) {
        done(new Error('Stream should not have ended'));
      } else {
        count++;
        if (count > Object.keys(obj).length) {
          done(new Error('Stream yielded more values than expected'));
        }
      }
    });
  });
});