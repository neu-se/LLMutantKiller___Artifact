import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rules initialization', () => {
  it('should have correct initial rules state', () => {
    // The mutation changes rules from [] to ["Stryker was here"]
    // This test will fail on mutated code because the string in rules[0]
    // will match any input and return the string itself
    const result = plural('anything');
    expect(result).not.toBe('Stryker was here');
  });
});