import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should correctly handle stack traces', () => {
    const error = new Error('Test error');
    const promise = Q.reject(error);

    promise.catch((err) => {
      expect(err.stack).toContain('makeStackTraceLong');
    });
  });
});