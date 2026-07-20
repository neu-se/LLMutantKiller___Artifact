import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that can handle regex keys in the original code', () => {
    const regexKey = /test/;
    const data = 'test';
    const propFunction = prop(regexKey);
    const result = propFunction(data);
    expect(result).toBe('test');
  });
});