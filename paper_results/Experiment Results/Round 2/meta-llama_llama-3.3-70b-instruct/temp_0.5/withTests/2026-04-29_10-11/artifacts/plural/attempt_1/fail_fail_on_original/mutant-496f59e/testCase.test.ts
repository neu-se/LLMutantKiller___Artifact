import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should correctly handle words with a custom rule', () => {
    plural.addRule('test', function(w) { return w + 's' });
    expect(plural('test')).toBe('tests');
  });
});