import * as propModule from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return the correct value when key is a string', () => {
    const obj = { foo: 'bar' };
    const prop = propModule.default;
    const result = prop('foo')(obj);
    expect(result).toBe('bar');
  });

  it('should throw an error when key is not a string and not a RegExp in the mutated code', () => {
    const key = false;
    const prop = propModule.default;
    expect(() => prop(key)({})).toThrowError();
  });
});