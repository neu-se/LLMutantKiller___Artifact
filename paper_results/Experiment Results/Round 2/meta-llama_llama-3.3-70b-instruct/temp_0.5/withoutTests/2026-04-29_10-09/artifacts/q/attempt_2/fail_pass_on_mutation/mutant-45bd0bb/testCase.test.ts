import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should create an object with the given prototype using Object.create', () => {
    const prototype = { foo: 'bar' };
    const obj = Object.create(prototype);
    expect(obj.foo).toBe('bar');
  });
});