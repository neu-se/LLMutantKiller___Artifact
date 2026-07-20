import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('detect placeholder mutation', () => {
  it('should parse a bare domain without base URL where the inner-if prepend does not convert // prefix', () => {
    // For currentUrlStr = "//foo" with no baseUrl:
    // Line A converts to "http://foo"
    // else branch, inner if NOT entered (has protocol)
    // placeholder runs on "http://foo" - no effect in either version
    //
    // For currentUrlStr = "foo" with no baseUrl:
    // Line A: no change
    // else branch, inner if entered
    // prepend: "http://foo"  
    // placeholder: no effect in either version
    //
    // The mutation appears to be in dead code based on analysis.
    // But let me try: what if the inner if prepend regex on some input
    // produces a string starting with //?
    // /^(?!(?:\w+:)?\/\/)/ on "//foo": no match -> "//foo" unchanged
    // So if "//foo" somehow reached the inner if, placeholder would matter!
    // 
    // How could "//foo" reach inner if?
    // Inner if condition: !/^\.*\/|^(?!localhost)\w+:/.test("//foo")
    // /^\.*\// on "//foo": matches! (^ then zero dots then /)
    // So !true = false -> inner if NOT entered
    // Placeholder NOT reached for "//foo"
    //
    // The mutation truly seems undetectable. I'll try the most basic case.
    const result = parse("foo", undefined);
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://foo/");
  });
});