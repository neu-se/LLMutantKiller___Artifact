import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should return the fulfillment value of a promise when it is fulfilled', () => {
    const promise = Q.resolve('fulfilled value');
    const result = Q.nearer(promise);
    expect(result).toBe('fulfilled value');
  });
});