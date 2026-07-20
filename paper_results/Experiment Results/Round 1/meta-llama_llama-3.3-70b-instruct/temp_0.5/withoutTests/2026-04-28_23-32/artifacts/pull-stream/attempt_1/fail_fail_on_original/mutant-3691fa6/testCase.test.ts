import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that extracts a property when key is a string', () => {
    const key = 'test';
    const data = { test: 'value' };
    const extractor = prop(key);
    expect(extractor(data)).toBe('value');
  });
});