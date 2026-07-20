import { values } from '../../../sources/values.js';

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

  it('should return a function that does not abort immediately', () => {
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
});