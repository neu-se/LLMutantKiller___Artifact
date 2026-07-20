import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with object key', () => {
  it('should return a function that extracts the matched value when key is a regex', () => {
    const regexKey = /test/;
    const data = 'this is a test string';
    const extractor = prop(regexKey);
    const result = extractor(data);
    expect(result).toBe('test');
  });
});