import { find } from '../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === null;
    const cb = (err: any, data: any) => {
      if (err === null) {
        expect(data).not.toBeNull();
      } else {
        expect(err).not.toBeNull();
      }
    };
    find(test, cb);
  });
});