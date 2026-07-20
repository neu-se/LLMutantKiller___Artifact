import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex parsing with object form', () => {
  it('should throw when object has only "re" property but not "im"', () => {
    // With the original code (&&), both 're' and 'im' must be present
    // With the mutated code (||), having only 're' would match the first condition
    // and try to use a['im'] which is undefined, resulting in NaN instead of throwing
    
    const objWithOnlyRe = { re: 3 };
    
    // Original code: 'im' in a && 're' in a => false && true => false
    // Falls through to check 'abs'/'arg', 'r'/'phi', length, then throws
    // Mutated code: 'im' in a || 're' in a => false || true => true
    // Uses a['re'] = 3 and a['im'] = undefined (NaN), no throw
    
    expect(() => {
      new Complex(objWithOnlyRe as any);
    }).toThrow(SyntaxError);
  });
});