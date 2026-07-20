import { once } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call cb with value when value is not null and abort is false', () => {
    const value = 'test';
    const onAbort = jest.fn();
    const cb = jest.fn();
    const onceFn = once(value, onAbort);
    onceFn(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, value);
    expect(onAbort).toHaveBeenCalledTimes(0);
  });

  it('should call onAbort when value is not null and abort is true', () => {
    const value = 'test';
    const onAbort = jest.fn();
    const cb = jest.fn();
    const onceFn = once(value, onAbort);
    onceFn(true, cb);
    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});