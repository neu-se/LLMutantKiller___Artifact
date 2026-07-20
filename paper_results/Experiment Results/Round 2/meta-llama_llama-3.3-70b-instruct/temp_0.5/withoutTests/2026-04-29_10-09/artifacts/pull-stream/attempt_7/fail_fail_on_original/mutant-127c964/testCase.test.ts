import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return a stream that yields values when given an array and an object', (done) => {
    const array = [1, 2, 3];
    const obj = { a: 1, b: 2, c: 3 };
    const stream1 = values(array);
    const stream2 = values(obj);
    let count1 = 0;
    let count2 = 0;
    stream1(null, (err: any, value: any) => {
      if (err) {
        done(err);
      } else if (value === undefined) {
        if (count1 !== array.length) {
          done(new Error('Stream did not yield all values'));
        }
      } else {
        count1++;
        stream1(null, (err: any, value: any) => {
          if (err) {
            done(err);
          } else if (value === undefined) {
            if (count1 !== array.length) {
              done(new Error('Stream did not yield all values'));
            }
            done();
          } else {
            count1++;
          }
        });
      }
    });
    stream2(null, (err: any, value: any) => {
      if (err) {
        done(err);
      } else if (value === undefined) {
        if (count2 !== Object.keys(obj).length) {
          done(new Error('Stream did not yield all values'));
        }
      } else {
        count2++;
        stream2(null, (err: any, value: any) => {
          if (err) {
            done(err);
          } else if (value === undefined) {
            if (count2 !== Object.keys(obj).length) {
              done(new Error('Stream did not yield all values'));
            }
          } else {
            count2++;
          }
        });
      }
    });
  });
});