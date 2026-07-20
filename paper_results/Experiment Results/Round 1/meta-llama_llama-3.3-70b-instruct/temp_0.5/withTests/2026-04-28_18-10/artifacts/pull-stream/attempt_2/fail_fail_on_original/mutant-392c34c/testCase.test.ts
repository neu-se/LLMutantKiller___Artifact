import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find';
import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const testFn = (data: any) => data === 7;
    const cb = jest.fn((err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBe(7);
    });

    const read = find(testFn, cb);
    const ended = false;
    values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(null, (end: any, data: any) => {
      if (end) return;
      read(end, data);
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });
});