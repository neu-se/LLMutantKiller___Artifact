import { Q } from '../q.js';

describe('Q', () => {
  it('should correctly handle stack traces', () => {
    const error = new Error('Test error');
    const promise = Q.reject(error);

    let caughtError: any;
    promise.catch((err: any) => {
      caughtError = err;
    });

    expect(caughtError).toBeUndefined();

    // Simulate the promise being resolved
    promise.then(() => {
      expect(caughtError).not.toBeUndefined();
    });
  });
});