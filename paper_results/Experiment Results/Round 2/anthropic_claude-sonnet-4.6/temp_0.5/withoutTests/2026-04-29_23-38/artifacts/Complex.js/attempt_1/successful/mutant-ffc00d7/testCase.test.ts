import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with 'i' token", () => {
  it("should throw SyntaxError when 'i' appears without preceding number or sign", () => {
    // The mutation changes `if (plus + minus === 0)` to `if (false)`,
    // which means the parser no longer throws when 'i' appears without
    // a preceding plus/minus sign in an invalid position.
    // For example, parsing "i" alone: plus starts at 1, minus at 0,
    // so plus + minus = 1 !== 0, which means it won't throw in either version.
    // We need a case where plus + minus === 0 when 'i' is encountered.
    // This happens when a number was already consumed (resetting plus=minus=0)
    // and then 'i' appears again without a sign.
    // Example: "1i1i" - after parsing "1i", plus=minus=0, then "1" resets again,
    // then "i" is encountered with plus=minus=0.
    // Actually let's think more carefully:
    // "1i" is valid (1*i = i), but what about "1 1i"?
    // After "1": plus=minus=0 (consumed). Then "1" again: plus+minus=0, isNaN("1")=false -> parser_exit
    // Let's try: after consuming a number token followed by 'i', plus=minus=0.
    // Then if another 'i' appears: plus+minus=0 -> should throw in original, not in mutant.
    // "1ii" - parse "1i" sets im=1, plus=minus=0, then "i" with plus+minus=0 -> throw in original
    expect(() => new Complex("1ii")).toThrow(SyntaxError);
  });
});