import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return a function that yields values from an array', () => {
    const array = [1, 2, 3];
    const read = values(array);
    let i = 0;
    read(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
    });
    read(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
    });
    read(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
    });
    read(null, (end, value) => {
      expect(end).toBe(true);
      expect(value).toBeUndefined();
    });
  });

  it('should return a function that yields values from an object', () => {
    const object = { a: 1, b: 2, c: 3 };
    const read = values(object);
    let i = 0;
    read(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(Object.values(object)[i++]);
    });
    read(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(Object.values(object)[i++]);
    });
    read(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(Object.values(object)[i++]);
    });
    read(null, (end, value) => {
      expect(end).toBe(true);
      expect(value).toBeUndefined();
    });
  });

  it('should return a function that yields values and then aborts', () => {
    const array = [1, 2, 3];
    const read = values(array);
    let i = 0;
    read(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
    });
    read(true, (end, value) => {
      expect(end).toBe(true);
      expect(value).toBeUndefined();
    });
  });

  it('should return a function that yields values and then calls the onAbort callback', () => {
    const array = [1, 2, 3];
    let called = false;
    const onAbort = () => {
      called = true;
    };
    const read = values(array, onAbort);
    let i = 0;
    read(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(array[i++]);
    });
    read(true, (end, value) => {
      expect(end).toBe(true);
      expect(value).toBeUndefined();
      expect(called).toBe(true);
    });
  });
});