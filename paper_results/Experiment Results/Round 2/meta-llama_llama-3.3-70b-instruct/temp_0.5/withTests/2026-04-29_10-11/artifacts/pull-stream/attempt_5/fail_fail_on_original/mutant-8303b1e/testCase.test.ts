import { prop } from '../../../../util/prop';

describe('prop function', () => {
  it('should behave correctly for the original and mutated code', () => {
    const key = /test/;
    const data = 'test string';

    // In the original code, this should return 'test'
    // In the mutated code, this should return the key itself (/test/)
    expect(prop(key)(data)).toBe('test');
  });
});