import { find } from '../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === null;
    const cb = (err: any, data: any) => {
      if (err === null && data === null) {
        throw new Error('Expected error to be thrown');
      }
    };
    find(test, cb);
  });
});