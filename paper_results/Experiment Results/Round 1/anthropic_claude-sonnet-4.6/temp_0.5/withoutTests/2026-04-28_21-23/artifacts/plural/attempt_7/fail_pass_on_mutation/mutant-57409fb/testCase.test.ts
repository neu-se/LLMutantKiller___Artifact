import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should return singular when num is explicitly 1 but plural when num is undefined", () => {
    // If original is: num !== 1 || num === undefined
    // num=1: false || false = false -> return word (singular) ✓
    // num=undefined: true || true = true -> pluralize ✓
    // Mutated: num !== 1 || false  
    // num=1: false || false = false -> return word (singular) - same
    // num=undefined: true || false = true -> pluralize - same
    // These are truly equivalent... trying addRule behavior
    plural.addRule('testword123', 'testwords123');
    expect(plural('testword123')).toBe('testwords123');
    expect(plural('testword123', 1)).toBe('testword123');
    expect(plural('testword123', 2)).toBe('testwords123');
  });
});