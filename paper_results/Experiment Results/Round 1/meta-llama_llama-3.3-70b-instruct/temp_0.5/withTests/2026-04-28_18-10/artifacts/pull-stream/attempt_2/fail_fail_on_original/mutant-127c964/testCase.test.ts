import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return an array when given an array', (done) => {
    const array = [1, 2, 3];
    const read = values(array);
    const result: any[] = [];

    read(null, (end, data) => {
      if (end === true) {
        expect(result).toEqual([1, 2, 3]);
        done();
      } else {
        result.push(data);
        read(null, (end, data) => {
          if (end === true) {
            expect(result).toEqual([1, 2, 3]);
            done();
          } else {
            result.push(data);
            read(null, (end, data) => {
              if (end === true) {
                expect(result).toEqual([1, 2, 3]);
                done();
              }
            });
          }
        });
      }
    });
  });
});