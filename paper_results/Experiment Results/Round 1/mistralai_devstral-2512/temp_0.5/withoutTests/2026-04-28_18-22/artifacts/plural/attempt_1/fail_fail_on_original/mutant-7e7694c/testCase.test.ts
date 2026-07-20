import plural from './index.js';

describe('plural function', () => {
  it('should correctly pluralize words ending in f or fe, except for dwarf and roof', () => {
    expect(plural('knife')).toBe('knives');
    expect(plural('leaf')).toBe('leaves');
    expect(plural('wolf')).toBe('wolves');
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});