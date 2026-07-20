import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for words containing "ics" in the middle', () => {
    expect(plural('statistics')).toBe('statistics');
    expect(plural('mathematics')).toBe('mathematics');
    expect(plural('logicics')).toBe('logicicses');
  });
});