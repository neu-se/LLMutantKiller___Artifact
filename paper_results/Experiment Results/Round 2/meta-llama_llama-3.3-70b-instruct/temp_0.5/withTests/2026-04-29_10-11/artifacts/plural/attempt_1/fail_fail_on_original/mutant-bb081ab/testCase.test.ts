import { plural } from '../../index';

describe('plural function', () => {
  it('should correctly pluralize words with custom rules', () => {
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('tests');
  });
});