import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return an array of values when given an object', (done) => {
    const obj = { a: 1, b: 2, c: 3 };
    const expectedValues = [1, 2, 3];
    const actualValues: any[] = [];
    const stream = values(obj);
    stream(null, (err, value) => {
      if (err) {
        done(err);
      } else {
        actualValues.push(value);
        if (value === undefined) {
          expect(actualValues).toEqual(expectedValues);
          done();
        } else {
          stream(null, (err, value) => {
            if (err) {
              done(err);
            } else {
              actualValues.push(value);
              if (value === undefined) {
                expect(actualValues).toEqual(expectedValues);
                done();
              } else {
                stream(null, (err, value) => {
                  if (err) {
                    done(err);
                  } else {
                    actualValues.push(value);
                    expect(actualValues).toEqual(expectedValues);
                    done();
                  }
                });
              }
            }
          });
        }
      }
    });
  });
});