import { pull } from '../pull.js';

describe('pull', () => {
  it('should pass with a function as the second argument', () => {
    const read = () => {};
    const s = () => {};
    expect(() => pull(read, s)).not.toThrowError();
  });

  it('should not call s.sink when s is an object but not a function', () => {
    const read = () => {};
    const s = { foo: 'bar' };
    const sinkSpy = jest.fn();
    s.sink = sinkSpy;
    pull(read, s);
    expect(sinkSpy).not.toHaveBeenCalled();
  });
});