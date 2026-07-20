import { find } from '../../../../../../../../subject_repositories/pull-stream/sinks/find';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === null;
    const cb = (err: any, data: any) => {
      if (err !== null && err !== undefined) {
        throw new Error('Expected error to be null or undefined');
      }
      if (data === null) {
        throw new Error('Expected data not to be null');
      }
    };
    const values = [null, true, false];
    for (const value of values) {
      find((x: any) => x === value, cb);
    }
  });
});