import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find";

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
    expect(read).toBeInstanceOf(Function);
    read(null, (end: any, data: any) => {
      if (end) return;
      if (data === 7) {
        cb(null, data);
      }
    });
    read(true, (end: any, data: any) => {
      if (end === true) {
        cb(null, null);
      }
    });
  });
});