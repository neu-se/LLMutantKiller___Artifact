import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const testFn = (data: any) => data === 7;
    const cb = jest.fn((err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBe(7);
    });

    const read = find(testFn, cb);
    expect(read).toBeInstanceOf(Function);
    const ended = false;
    read(null, (end: any, data: any) => {
      if (end) return;
      if (data === 7) {
        expect(cb).toHaveBeenCalledTimes(1);
      }
    });
  });
});