import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should create an object with the given prototype using Object.create if it exists', () => {
    const prototype = { foo: 'bar' };
    const obj = Q(prototype);
    expect(Object.getPrototypeOf(obj)).toBe(prototype);
  });
});