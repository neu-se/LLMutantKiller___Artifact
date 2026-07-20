import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should handle array input correctly', () => {
    const array = [1, 2, 3];
    const read = values(array, () => {});
    let result = [];
    read(null, (end, data) => {
      if (end) {
        expect(result).toEqual([1, 2, 3]);
      } else {
        result.push(data);
      }
    });
    read(null, (end, data) => {
      if (end) {
        expect(result).toEqual([1, 2, 3]);
      } else {
        result.push(data);
      }
    });
    read(null, (end, data) => {
      if (end) {
        expect(result).toEqual([1, 2, 3]);
      } else {
        result.push(data);
      }
    });
  });
});