import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle the plural form of words ending with "ics" in a case-insensitive manner', () => {
    expect(plural('ics', 2)).toBe('ics');
    expect(plural('ICS', 2)).toBe('ICS');
    expect(plural('IcS', 2)).toBe('IcS');
  });
});