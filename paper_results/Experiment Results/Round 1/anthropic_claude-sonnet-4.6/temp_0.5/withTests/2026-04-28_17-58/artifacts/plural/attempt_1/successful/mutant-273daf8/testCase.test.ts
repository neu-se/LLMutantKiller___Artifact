import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural f/fe ending words', () => {
  it('should pluralize "roof" as "roofs" not "rooves"', () => {
    expect(plural('roof')).toBe('roofs');
  });
});