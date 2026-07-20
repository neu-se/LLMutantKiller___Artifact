import { find } from '../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === null;
    const cb = (err: any, data: any) => {
      if (err !== null && err !== undefined) {
        throw new Error('Expected no error');
      }
    };
    find(null, cb);
    expect(() => find(null, cb)).not.toThrow();
  });
});