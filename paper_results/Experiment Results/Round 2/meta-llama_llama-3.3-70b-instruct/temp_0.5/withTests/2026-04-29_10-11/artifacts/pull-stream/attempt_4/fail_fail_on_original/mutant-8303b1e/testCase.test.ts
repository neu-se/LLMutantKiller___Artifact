import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should behave correctly for the original and mutated code', () => {
    const key = 'test';
    const data = { test: 'value' };

    // In the original code, this should return 'value'
    // In the mutated code, this should return undefined
    expect(prop(key)(data)).toBe('value');
  });
});