import { values } from '../sources/values';

describe('values', () => {
  it('should return values when input is an array and handle undefined input', () => {
    const array = [1, 2, 3];
    const result = values(array);
    let called = false;
    result(null, (err: any, data: any) => {
      called = true;
      expect(err).toBeNull();
      expect(data).toBe(1);
    });
    expect(called).toBe(true);

    const result2 = values(undefined);
    let called2 = false;
    result2(null, (err: any, data: any) => {
      called2 = true;
      expect(err).toBeNull();
      expect(data).toBe(true); 
    });
    expect(called2).toBe(true);
  });
});