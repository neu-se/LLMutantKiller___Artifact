import * as propModule from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function when key is a string', () => {
    const key = 'foo';
    const prop = propModule.default;
    const result = prop(key);
    expect(typeof result).toBe('function');
  });

  it('should not return a function when key is false in the mutated code', () => {
    const key = false;
    const prop = propModule.default;
    const result = prop(key);
    expect(typeof result).not.toBe('function');
  });
});