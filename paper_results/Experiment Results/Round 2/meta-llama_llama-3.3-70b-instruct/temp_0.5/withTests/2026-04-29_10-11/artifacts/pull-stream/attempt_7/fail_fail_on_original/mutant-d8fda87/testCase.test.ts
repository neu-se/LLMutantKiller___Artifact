import { once } from '../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call callback with value when value is not null and abort is false', () => {
    const cb = jest.fn();
    const onAbort = jest.fn();
    const read = once('test', onAbort);
    read(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'test');
    read(true, cb);
    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});