import { default as plural } from '../index';

describe('plural function', () => {
  it('should correctly pluralize words with exact string matches', () => {
    expect(plural('criterion')).toBe('criteria');
  });
});