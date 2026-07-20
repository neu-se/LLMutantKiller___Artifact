import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with ch, x, or s', () => {
    expect(plural('box')).toBe('boxes');
    expect(plural('church')).toBe('churches');
    expect(plural('bus')).toBe('buses');
  });
});