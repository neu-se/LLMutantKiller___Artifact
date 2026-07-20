import { plural } from './index';

describe('plural function', () => {
  it('should return the correct plural form', () => {
    expect(typeof plural).toBe('function');
    expect(plural('test')).toBe('tests');
    expect(plural('cactus')).toBe('cacti');
    expect(plural('focus')).toBe('foci');
  });
});