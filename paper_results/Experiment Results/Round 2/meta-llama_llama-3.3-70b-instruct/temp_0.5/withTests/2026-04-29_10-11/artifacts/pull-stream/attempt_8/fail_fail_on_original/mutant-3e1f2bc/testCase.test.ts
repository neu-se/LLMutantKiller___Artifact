import { pull } from '../../pull.js';

describe('pull function', () => {
  it('should handle a function and an object as arguments correctly', () => {
    const obj = { a: 1, b: 2 };
    const func = () => {};
    const read = pull(func, obj);
    expect(typeof read).toBe('function');
    read(null, (err: any, data: any) => {
      expect(err).toBeUndefined();
    });
    expect(() => pull(func, obj)).not.toThrow();
  });
});