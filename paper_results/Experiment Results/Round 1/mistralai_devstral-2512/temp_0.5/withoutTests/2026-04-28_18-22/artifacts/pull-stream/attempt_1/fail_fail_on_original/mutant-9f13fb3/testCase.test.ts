import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with string key', () => {
  it('should return a function that retrieves the value at the given key', () => {
    const getName = prop('name');
    const data = { name: 'Alice' };
    expect(getName(data)).toBe('Alice');
  });
});