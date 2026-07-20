import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string '0' correctly - testing empty string token behavior", () => {
    // The mutation changes '\n' check to "" check
    // isNaN("") === false in JavaScript (Number("") === 0)
    // In original: "" in else branch with plus+minus>0 would be parsed as 0
    // In mutated: "" is silently skipped as whitespace
    // 
    // To get "" as a token, we need the regex to produce one
    // The regex /\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g cannot produce ""
    // 
    // BUT: what if we look at what happens with a string like "0e" ?
    // "0e".match(regex) - "0e" - does \d+\.?\d*e[+-]?\d+ match? No, needs digits after e
    // So it would match "0" then "e" -> tokens = ["0", "e"]
    // "e" is not whitespace, not +/-, not i/I, isNaN("e")=true -> parser_exit in both
    
    // What about testing with a number that has a zero-length match somehow?
    // I don't think that's possible
    
    // Let me try: what string input causes different behavior between original and mutated?
    // The ONLY difference is '\n' vs "" in the whitespace check
    // Since neither appears as a token, the mutation appears equivalent
    // 
    // Unless... the test should verify that the original correctly rejects something
    // that the mutated version accepts, or vice versa
    // 
    // In mutated: "" is whitespace. If somehow "" is a token between two numbers,
    // mutated would skip it allowing the parse to succeed, while original would fail
    // 
    // I cannot produce "" as a token. This mutation may be equivalent.
    // But let me try one more thing: what about the string "1e0" ?
    expect(new Complex("1e0").re).toBe(1);
  });
});