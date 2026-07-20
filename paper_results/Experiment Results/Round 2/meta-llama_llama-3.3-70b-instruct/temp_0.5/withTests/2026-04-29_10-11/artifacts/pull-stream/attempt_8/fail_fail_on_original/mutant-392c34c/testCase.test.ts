import { find } from '../../../sinks/find';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === true;
    const cb = (err: any, data: any) => {
      if (err !== null && err !== undefined) {
        throw new Error('Expected error to be null or undefined');
      }
      if (data !== true) {
        throw new Error('Expected data to be true');
      }
    };
    find(test, cb);
  });
});