import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values";

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const testFn = (data: any) => data === 7;
    const cb = jest.fn((err: any, result: any) => {
      if (err === null && result === 7) {
        return;
      }
      throw new Error('Unexpected error or result');
    });

    const read = find(testFn, cb);
    values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(null, (end: any, data: any) => {
      if (end) return;
      read(end, data);
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });
});