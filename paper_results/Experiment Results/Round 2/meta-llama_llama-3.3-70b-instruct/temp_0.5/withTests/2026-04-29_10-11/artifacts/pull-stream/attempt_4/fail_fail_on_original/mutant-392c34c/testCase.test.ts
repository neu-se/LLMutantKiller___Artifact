import { find } from '../../../sinks/find';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === true;
    const cb = (err: any, data: any) => {
      if (err !== null && err !== undefined) {
        throw new Error('Expected no error');
      }
      if (data === null) {
        throw new Error('Expected data not to be null');
      }
    };
    find(test, cb);
  });
});