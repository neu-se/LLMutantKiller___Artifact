import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with x', () => {
    expect(plural('max')).toBe('maxes');
  });
});