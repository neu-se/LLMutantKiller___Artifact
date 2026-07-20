import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return an array when given an object', (done) => {
    const obj = { a: 1, b: 2, c: 3 };
    const read = values(obj);
    const result: any[] = [];

    read(null, (end, data) => {
      if (end) {
        done();
      } else {
        result.push(data);
        read(null, (end, data) => {
          if (end) {
            done();
          } else {
            result.push(data);
            read(null, (end, data) => {
              if (end) {
                done();
              } else {
                result.push(data);
                read(null, (end, data) => {
                  if (end) {
                    try {
                      expect(result).toEqual([1, 2, 3]);
                      done();
                    } catch (error) {
                      done(error);
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  });
});