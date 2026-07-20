import { plural } from '../index';

describe('plural', () => {
  it('should handle f/fe ending words correctly', () => {
    expect(plural('dwarf')).toBe('dwarves');
  });
});