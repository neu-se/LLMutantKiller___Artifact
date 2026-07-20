import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function that extracts the first match when key is a RegExp', () => {
    const data = 'hello world';
    const key = /world/;
    const extractor = prop(key);
    const result = extractor(data);
    expect(result).not.toBe(false);
  });
});