import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly handle stack traces', () => {
    const error = new Error('Test error');
    const promise = Q.reject(error);
    const originalStack = error.stack;

    promise.catch((err) => {
      expect(err.stack).not.toEqual(originalStack);
    });
  });
});