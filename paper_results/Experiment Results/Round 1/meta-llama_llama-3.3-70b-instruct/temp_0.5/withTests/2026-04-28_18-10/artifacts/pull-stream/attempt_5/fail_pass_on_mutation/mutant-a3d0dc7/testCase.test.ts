import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return a function that yields values from an array without aborting immediately', () => {
    const array = [1, 2, 3];
    const read = values(array);
    let called = false;
    read(null, (end: boolean | Error, value: any) => {
      called = true;
      expect(end).toBeNull();
      expect(value).toBe(array[0]);
    });
    expect(called).toBe(true);
    called = false;
    read(null, (end: boolean | Error, value: any) => {
      called = true;
      expect(end).toBeNull();
      expect(value).toBe(array[1]);
    });
    expect(called).toBe(true);
  });
});