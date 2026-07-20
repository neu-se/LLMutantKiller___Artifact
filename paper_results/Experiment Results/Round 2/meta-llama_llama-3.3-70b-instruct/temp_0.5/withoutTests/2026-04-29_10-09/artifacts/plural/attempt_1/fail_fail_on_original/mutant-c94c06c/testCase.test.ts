import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle the plural form of "roof"', () => {
    expect(plural('roof')).toBe('roofs');
  });
});