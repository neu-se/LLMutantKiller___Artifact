import { count } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js';

describe('count function', () => {
  it('should call cb with next value when end is false', () => {
    const cb = jest.fn();
    const end = false;
    const read = count(10);
    read(end, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 0);
  });
});