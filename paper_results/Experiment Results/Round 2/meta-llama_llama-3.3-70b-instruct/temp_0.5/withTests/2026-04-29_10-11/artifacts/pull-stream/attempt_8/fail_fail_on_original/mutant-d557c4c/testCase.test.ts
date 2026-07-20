import { pull } from '../../pull.js';

describe('pull', () => {
  it('should pass with a function as the second argument', () => {
    const read = () => {};
    const s = () => {};
    expect(() => pull(read, s)).not.toThrowError();
  });

  it('should call s.sink when s is an object with a sink function', () => {
    const read = () => {};
    const s = { sink: jest.fn() };
    pull(read, s);
    expect(s.sink).toHaveBeenCalledTimes(1);
  });
});