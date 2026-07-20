import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find";

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const testFn = (data: any) => data === 7;
    const cb = jest.fn((err: any, result: any) => {
      if (err === null && result === 7) {
        return;
      }
      throw new Error('Unexpected error or result');
    });

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 7);
    };

    const read = find(testFn, cb);
    source(null, (end: any, data: any) => {
      read(end, data);
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });
});