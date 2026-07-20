import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should behave correctly for the original and mutated code', () => {
    const key = 'test';
    const data = { test: 'value' };

    // In the original code, this should return 'value'
    // In the mutated code, this should throw an error because the condition "" === typeof key is never true for a string key
    expect(prop(key)(data)).toBe('value');
  });
});