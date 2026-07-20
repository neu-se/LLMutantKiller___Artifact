import pluralFn from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural mutation detection with undefined rule key', () => {
  it('should not match a rule with undefined key when word is undefined', () => {
    (pluralFn as any).addRule(undefined, 'matched-undefined');
    // Original: type(undefined)==='String' -> false -> no match -> undefined+'s' = 'undefineds'
    // Mutated: true && undefined===undefined -> true -> returns 'matched-undefined'
    const result = (pluralFn as any)(undefined);
    expect(result).toBe('undefineds');
  });
});