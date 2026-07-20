import { pull } from '../../../pull.js';

describe('pull function', () => {
  it('should handle an object as the second argument correctly', () => {
    const obj = { a: 1, b: 2 };
    const func = () => {};
    const read = pull(func, obj);
    expect(typeof read).toBe('function');
    read(null, (err: any, data: any) => {
      expect(err).toBeUndefined();
    });
  });
});