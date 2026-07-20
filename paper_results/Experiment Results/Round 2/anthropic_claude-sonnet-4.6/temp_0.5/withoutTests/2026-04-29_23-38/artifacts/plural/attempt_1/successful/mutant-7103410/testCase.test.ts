import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('monkeyPatch', () => {
  it('should add a working plural method to String prototype that returns the pluralized form', () => {
    plural.monkeyPatch();
    
    const result = ('cat' as any).plural();
    
    expect(result).toBe('cats');
    
    plural.unmonkeyPatch();
  });
});