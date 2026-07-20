import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should pluralize when num is explicitly undefined', () => {
    plural.monkeyPatch();
    const result = ('test' as any).plural(undefined);
    plural.unmonkeyPatch();
    expect(result).toBe('tests');
  });
});