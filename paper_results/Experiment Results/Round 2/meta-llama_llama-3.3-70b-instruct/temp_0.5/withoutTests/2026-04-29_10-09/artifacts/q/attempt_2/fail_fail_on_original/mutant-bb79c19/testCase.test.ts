import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should return the fulfillment value of a promise when it is fulfilled', () => {
    const promise = Q.resolve('fulfilled value');
    const inspected = promise.inspect();
    expect(inspected.state).toBe('fulfilled');
    expect(Q.nearer(promise)).toBe(inspected.value);
  });
});