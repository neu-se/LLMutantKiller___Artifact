import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should return a function that extracts a match from a string when given a RegExp key', () => {
    const data = 'hello world';
    const key = /world/;
    const propFunction = prop(key);
    expect(propFunction).toBeInstanceOf(Function);
    const result = propFunction(data);
    expect(result).not.toBeUndefined();
  });
});