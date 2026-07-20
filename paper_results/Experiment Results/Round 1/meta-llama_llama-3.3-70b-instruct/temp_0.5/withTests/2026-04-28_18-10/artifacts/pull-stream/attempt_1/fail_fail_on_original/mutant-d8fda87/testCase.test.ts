import { once } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call abortCb when abort is true', () => {
    const abortCbSpy = jest.fn();
    const onAbortSpy = jest.fn();
    const onceFn = once(null, onAbortSpy);
    onceFn(true, abortCbSpy);
    expect(abortCbSpy).toHaveBeenCalledTimes(1);
    expect(onAbortSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call abortCb when abort is false', () => {
    const abortCbSpy = jest.fn();
    const onAbortSpy = jest.fn();
    const onceFn = once(null, onAbortSpy);
    onceFn(false, abortCbSpy);
    expect(abortCbSpy).toHaveBeenCalledTimes(0);
    expect(onAbortSpy).toHaveBeenCalledTimes(0);
  });
});