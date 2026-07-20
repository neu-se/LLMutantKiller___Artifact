import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that returns the property value when key is a string', () => {
    const key = 'test';
    const data = { test: 'value' };
    expect(prop(key)(data)).toBe('value');
  });
});