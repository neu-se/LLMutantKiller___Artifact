import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should return the correct plural form for a given word', () => {
    expect(plural('bacterium')).toBe('bacteria');
    expect(plural('')).not.toBe('bacteria');
  });
});