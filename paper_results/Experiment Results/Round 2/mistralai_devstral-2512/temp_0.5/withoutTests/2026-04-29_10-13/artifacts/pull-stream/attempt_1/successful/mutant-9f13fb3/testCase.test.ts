import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with string key', () => {
  it('should return a function that retrieves the property value when given a string key', () => {
    const getName = prop('name');
    const data = { name: 'Alice' };
    expect(getName(data)).toBe('Alice');
  });
});