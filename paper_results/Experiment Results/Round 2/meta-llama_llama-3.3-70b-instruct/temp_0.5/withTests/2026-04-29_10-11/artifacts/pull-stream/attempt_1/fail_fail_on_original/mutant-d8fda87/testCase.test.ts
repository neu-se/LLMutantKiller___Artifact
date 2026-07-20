import { once } from '../../../../../../../../subject_repositories/pull-stream/sources/once.js';

describe('once', () => {
  it('should call abort callback when abort is true', () => {
    const onAbort = jest.fn();
    const read = once(null, onAbort);
    read(true, () => {});
    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});