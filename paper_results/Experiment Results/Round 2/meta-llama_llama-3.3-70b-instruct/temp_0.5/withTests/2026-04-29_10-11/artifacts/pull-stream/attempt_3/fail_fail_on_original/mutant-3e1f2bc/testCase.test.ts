import { pull } from '../pull';

describe('pull function', () => {
  it('should handle an object as the second argument correctly', () => {
    const obj = { a: 1, b: 2 };
    const read = pull(() => {}, obj);
    expect(read).toThrowError();
  });
});