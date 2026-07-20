import { once } from '../../../sources/once.js';

describe('once', () => {
  it('should call callback with value when value is not null and abort is false, but not call onAbort', () => {
    const cb = jest.fn();
    const onAbort = jest.fn();
    const read = once('test', onAbort);
    read(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'test');
    expect(onAbort).not.toHaveBeenCalled();
  });
});