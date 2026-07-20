import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should create an object with the given prototype', () => {
    const prototype = { foo: 'bar' };
    const obj = Q(prototype);
    expect(obj.foo).toBe('bar');
  });
});