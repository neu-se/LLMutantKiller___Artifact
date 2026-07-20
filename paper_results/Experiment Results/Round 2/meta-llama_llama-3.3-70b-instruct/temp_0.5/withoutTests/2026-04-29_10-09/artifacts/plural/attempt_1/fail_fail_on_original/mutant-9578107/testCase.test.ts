import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for "roof"', () => {
    expect(plural('roof', 2)).toBe('roofs');
  });
});