import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return a function that yields values from an array and allows multiple reads without aborting immediately', () => {
    const array = [1, 2, 3];
    const read = values(array);
    let i = 0;
    read(null, (end: boolean | Error, value: any) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
      read(null, (end: boolean | Error, value: any) => {
        expect(end).toBeNull();
        expect(value).toBe(array[i++]);
        read(null, (end: boolean | Error, value: any) => {
          expect(end).toBeNull();
          expect(value).toBe(array[i++]);
        });
      });
    });
    expect(i).toBe(3);
  });
});