import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return plural form when num is not provided (undefined)', () => {
    const result = plural('test', undefined);
    expect(result).toBe('tests');
    
    // The key difference: original has `|| num === undefined` which is redundant
    // but let's verify the addRule function still works
    plural.addRule('uniqueword123', 'uniquewords123');
    expect(plural('uniqueword123')).toBe('uniquewords123');
    expect(plural('uniqueword123', 1)).toBe('uniqueword123');
    expect(plural('uniqueword123', undefined)).toBe('uniquewords123');
  });
});