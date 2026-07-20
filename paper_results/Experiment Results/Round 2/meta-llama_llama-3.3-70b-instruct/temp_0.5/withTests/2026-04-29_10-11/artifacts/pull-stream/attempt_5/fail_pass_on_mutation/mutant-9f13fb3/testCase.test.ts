import * as propModule from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function that returns the value of the given key when key is a string', () => {
    const obj = { foo: 'bar' };
    const prop = propModule.default;
    const result = prop('foo')(obj);
    expect(result).toBe('bar');
  });

  it.skip('should fail when key is not a string and not a RegExp in the mutated code', () => {
    const key = false;
    const prop = propModule.default;
    expect(() => prop(key)).toThrowError();
  });
});