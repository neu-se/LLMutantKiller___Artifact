import { plural } from './index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('tests');
    plural.addRule('test', function(w) { return 'test'; });
    expect(plural('test')).toBe('tests');
  });
});