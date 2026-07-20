import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return values in the correct order when given an array', () => {
    const array = [1, 2, 3];
    const read = values(array, () => {});
    let result = [];
    read(null, (end, data) => {
      if (end) {
        expect(result).toEqual(array);
      } else {
        result.push(data);
        read(null, (end, data) => {
          if (end) {
            expect(result).toEqual(array);
          } else {
            result.push(data);
            read(null, (end, data) => {
              if (end) {
                expect(result).toEqual(array);
              } else {
                result.push(data);
              }
            });
          }
        });
      }
    });
  });
});