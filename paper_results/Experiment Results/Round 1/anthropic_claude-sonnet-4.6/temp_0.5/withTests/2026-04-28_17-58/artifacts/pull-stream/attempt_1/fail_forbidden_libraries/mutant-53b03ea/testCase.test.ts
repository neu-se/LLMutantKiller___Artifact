import { describe, it, expect } from "@jest/globals";
import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester with regexp", () => {
  it("should return a function that tests data against a regexp when given a regexp object", () => {
    const regexp = /^hello/;
    const testFn = tester(regexp);

    // With the original code, regexp is an object with a .test method,
    // so tester returns (data) => regexp.test(data)
    expect(testFn("hello world")).toBe(true);
    expect(testFn("world hello")).toBe(false);
  });
});