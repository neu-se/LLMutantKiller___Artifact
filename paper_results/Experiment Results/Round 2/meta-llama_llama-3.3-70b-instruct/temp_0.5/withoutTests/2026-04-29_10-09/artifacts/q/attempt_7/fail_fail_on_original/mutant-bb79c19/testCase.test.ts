import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should return the fulfillment value of a promise when it is fulfilled', () => {
    const promise = Q('fulfilled value');
    const result = Q.nearer(promise);
    if (result === undefined) {
      throw new Error('Q.nearer should not return undefined');
    }
    expect(result).toBe('fulfilled value');
  });
});