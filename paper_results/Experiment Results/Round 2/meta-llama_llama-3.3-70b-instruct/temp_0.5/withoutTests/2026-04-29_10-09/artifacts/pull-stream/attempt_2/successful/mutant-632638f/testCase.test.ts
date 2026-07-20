import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that extracts the correct property from an object', () => {
    const key = 'test';
    const data = { test: 'value' };
    const propFunction = prop(key);
    expect(propFunction).toBeInstanceOf(Function);
    expect(propFunction(data)).toBe('value');
  });
});