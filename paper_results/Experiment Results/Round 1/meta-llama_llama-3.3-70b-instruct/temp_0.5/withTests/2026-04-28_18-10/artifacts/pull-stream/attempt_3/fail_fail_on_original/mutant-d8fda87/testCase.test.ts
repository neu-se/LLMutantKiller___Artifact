import { once } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call cb with value when value is not null and abort is false', () => {
    const cbSpy = jest.fn();
    const onAbortSpy = jest.fn();
    const onceFn = once('test', onAbortSpy);
    onceFn(false, cbSpy);
    expect(cbSpy).toHaveBeenCalledTimes(1);
    expect(cbSpy).toHaveBeenCalledWith(null, 'test');
    expect(onAbortSpy).toHaveBeenCalledTimes(0);
  });
});