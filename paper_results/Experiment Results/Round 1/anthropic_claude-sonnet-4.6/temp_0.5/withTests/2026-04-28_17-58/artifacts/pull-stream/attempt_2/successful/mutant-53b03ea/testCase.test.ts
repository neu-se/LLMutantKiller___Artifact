import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester with regexp argument", () => {
  it("returns a predicate function that tests data against the regexp", () => {
    const regexp = /^hello/;
    const testFn = tester(regexp);

    // Original code: returns (data) => regexp.test(data), so "hello world" => true
    // Mutated code: falls through to prop(regexp) || id, which returns identity fn
    // Identity fn would return "hello world" (the string), not true/false boolean
    const matchingResult = testFn("hello world");
    const nonMatchingResult = testFn("world hello");

    expect(matchingResult).toBe(true);
    expect(nonMatchingResult).toBe(false);
  });
});