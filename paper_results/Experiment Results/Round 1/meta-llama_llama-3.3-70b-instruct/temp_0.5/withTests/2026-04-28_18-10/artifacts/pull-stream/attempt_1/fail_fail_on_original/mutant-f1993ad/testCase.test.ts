import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function that returns the value of the property when key is a string', () => {
    const data = { foo: 'bar' };
    const result = prop('foo')(data);
    expect(result).toBeUndefined();
  });

  it('should return a function that returns the matched value when key is a regexp', () => {
    const data = 'hello world';
    const result = prop(/world/)(data);
    expect(result).toBe('world');
  });

  it('should return a function that returns the key itself when key is not a string or regexp', () => {
    const data = 'hello world';
    const result = prop({})(data);
    expect(result).toBe({});
  });
});