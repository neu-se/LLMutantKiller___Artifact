import { once } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call cb with value when value is not null and abort is false', () => {
    const value = 'test';
    const onAbort = () => {};
    const cb = (err, data) => {
      expect(err).toBeNull();
      expect(data).toBe(value);
    };
    const onceFn = once(value, onAbort);
    onceFn(false, cb);
  });

  it('should not call cb with value when value is not null and abort is true', () => {
    const value = 'test';
    const onAbort = () => {};
    const cb = jest.fn();
    const onceFn = once(value, onAbort);
    onceFn(true, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, value);
  });
});