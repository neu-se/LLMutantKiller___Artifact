import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural man/woman regex end anchor behavior', () => {
  it('should pluralize "manual" as "manuals" not apply man->men rule', () => {
    expect(plural('manual')).toBe('manuals');
  });
});