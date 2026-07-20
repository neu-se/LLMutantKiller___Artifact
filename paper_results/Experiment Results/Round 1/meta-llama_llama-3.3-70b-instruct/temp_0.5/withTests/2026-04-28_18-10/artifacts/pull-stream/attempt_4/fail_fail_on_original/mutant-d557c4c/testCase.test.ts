import { pull } from '../pull.js';

describe('pull.js', () => {
  it('should pass when s is a function', () => {
    const s = () => {};
    expect(() => {
      pull(
        () => {},
        s
      );
    }).not.toThrowError();
  });

  it('should fail when s is an object without a function sink', () => {
    const s = { foo: 'bar' };
    expect(() => {
      pull(
        () => {},
        s
      );
    }).toThrowError();
  });
});