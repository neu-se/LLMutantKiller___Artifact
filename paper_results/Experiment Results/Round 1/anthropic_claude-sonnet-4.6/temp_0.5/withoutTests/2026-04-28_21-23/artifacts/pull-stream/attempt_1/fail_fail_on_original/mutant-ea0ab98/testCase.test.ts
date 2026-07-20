import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe('prop with regexp key', () => {
  it('should return matched string when regexp matches', () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    const result = fn('hello world');
    expect(result).toBe('hello');
  });
});