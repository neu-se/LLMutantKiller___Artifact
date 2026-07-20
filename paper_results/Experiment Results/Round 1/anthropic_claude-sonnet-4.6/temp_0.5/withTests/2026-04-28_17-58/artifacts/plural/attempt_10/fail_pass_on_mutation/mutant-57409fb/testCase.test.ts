import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should export addRule that returns the plural function', () => {
    const result = plural.addRule(/testxyz123/i, (w: string) => w + 'testxyz');
    expect(result).toBe(plural);
    expect(plural('testxyz123')).toBe('testxyz123testxyz');
  });
});