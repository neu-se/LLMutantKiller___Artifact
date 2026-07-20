import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with regex key', () => {
  it('should return a function that extracts the first match when key is a regex', () => {
    const regexKey = /test(\d+)/;
    const data = 'This is a test123 string';
    const getter = prop(regexKey);
    const result = getter(data);
    expect(result).toBe('test123');
  });
});