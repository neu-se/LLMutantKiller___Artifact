import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return a function that yields values from an array', () => {
    const array = [1, 2, 3];
    const read = values(array);
    let i = 0;
    read(null, (end: boolean | Error, value: any) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
    });
    read(null, (end: boolean | Error, value: any) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
    });
    read(null, (end: boolean | Error, value: any) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
    });
    read(null, (end: boolean | Error, value: any) => {
      expect(end).toBe(true);
      expect(value).toBeUndefined();
    });
  });

  it('should not abort immediately when called with no abort signal', () => {
    const array = [1, 2, 3];
    const read = values(array);
    let called = false;
    read(null, (end: boolean | Error, value: any) => {
      called = true;
      expect(end).toBeNull();
      expect(value).toBe(array[0]);
    });
    expect(called).toBe(true);
  });

  it('should abort when called with an abort signal', () => {
    const array = [1, 2, 3];
    const read = values(array);
    let called = false;
    read(true, (end: boolean | Error, value: any) => {
      called = true;
      expect(end).toBe(true);
      expect(value).toBeUndefined();
    });
    expect(called).toBe(true);
  });
});