import { plural } from '../../../index';

describe('plural function', () => {
  it('should correctly pluralize words that end with x, ch, or s', () => {
    expect(plural('fax')).toBe('faxes');
    expect(plural('starch')).toBe('starches');
    expect(plural('bus')).toBe('buses');
    expect(plural('fox')).toBe('foxes');
  });
});