import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that returns the property value when key is a string', () => {
    const key = 'test';
    const data = { test: 'value' };
    const propFunction = prop(key);
    expect(propFunction(data)).toBe('value');
  });
});