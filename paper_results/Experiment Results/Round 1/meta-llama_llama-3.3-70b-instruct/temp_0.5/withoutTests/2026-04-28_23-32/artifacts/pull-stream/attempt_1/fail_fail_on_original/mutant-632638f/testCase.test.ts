import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the value of the given key from the data object', () => {
    const key = 'testKey';
    const data = { testKey: 'testValue' };
    const result = prop(key)(data);
    expect(result).toBe('testValue');
  });
});