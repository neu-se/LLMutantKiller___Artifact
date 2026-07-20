import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should handle array input correctly and not return true immediately', () => {
    const array = [1, 2, 3];
    const read = values(array, () => {});
    let firstCall = true;
    read(null, (end, data) => {
      if (firstCall) {
        expect(end).not.toBe(true);
        firstCall = false;
      }
    });
  });
});