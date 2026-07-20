import { once } from '../../../sources/once.js';

describe('once', () => {
  it('should call callback with value when value is not null', () => {
    const cb = jest.fn();
    const read = once('test', () => {});
    read(null, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'test');
  });
});