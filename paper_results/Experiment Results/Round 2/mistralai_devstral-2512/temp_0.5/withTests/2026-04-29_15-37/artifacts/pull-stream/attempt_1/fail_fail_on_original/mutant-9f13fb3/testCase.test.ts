import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function behavior with string key', () => {
  it('should return a function that accesses the property when key is a string', () => {
    const getName = prop('name');
    const data = { name: 'Alice', age: 30 };
    const result = getName(data);
    expect(result).toBe('Alice');
  });
});