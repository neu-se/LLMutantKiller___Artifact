import { plural } from '../index';

describe('plural', () => {
  it('should correctly handle the plural form of a word with a custom rule', () => {
    expect(plural('cactus')).toBe('cacti');
    plural.addRule('cactus', 'cactuses');
    expect(plural('cactus')).toBe('cactuses');
  });
});