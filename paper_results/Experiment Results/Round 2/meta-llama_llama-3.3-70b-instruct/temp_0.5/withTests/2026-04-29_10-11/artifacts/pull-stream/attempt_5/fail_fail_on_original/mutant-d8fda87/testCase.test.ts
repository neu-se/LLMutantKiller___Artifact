import { once } from '../../../sources/once.js';

describe('once', () => {
  it('should call abortCb when abort is true', () => {
    const cb = jest.fn();
    const onAbort = jest.fn();
    const read = once('test', onAbort);
    read(true, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});