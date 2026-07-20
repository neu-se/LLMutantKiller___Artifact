import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parsing with object containing only 're' property", () => {
  it("should throw SyntaxError when object has only 're' property but not 'im'", () => {
    // With the original code: 'im' in a && 're' in a
    // An object with only 're' should NOT match the condition (both must be present)
    // and should fall through to parser_exit(), throwing SyntaxError
    
    // With the mutated code: 'im' in a || 're' in a
    // An object with only 're' WOULD match the condition (either is sufficient)
    // and would try to use a['re'] and a['im'] (which would be undefined for 'im')
    
    expect(() => {
      new Complex({ re: 3 } as any);
    }).toThrow(SyntaxError);
  });
});