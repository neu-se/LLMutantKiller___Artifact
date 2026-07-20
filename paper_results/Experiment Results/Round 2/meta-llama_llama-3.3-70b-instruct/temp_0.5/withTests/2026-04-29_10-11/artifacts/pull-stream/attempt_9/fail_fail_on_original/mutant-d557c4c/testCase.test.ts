import { pull } from '../../../pull.js';

describe('pull', () => {
  it('should not call s.sink when s is an object but not a function and does not have a sink function', () => {
    const read = () => {};
    const s = {};
    const sinkSpy = jest.fn();
    s.sink = sinkSpy;
    pull(read, s);
    expect(sinkSpy).not.toHaveBeenCalled();
  });
});