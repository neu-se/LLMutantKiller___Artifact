import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher optional segment behavior", () => {
  it("should correctly handle paths with optional segments that have min=0 and opt=true", () => {
    const matcher = new Matcher("/a/**/b");
    expect(matcher.test("/a/b")).toBe(true);
    expect(matcher.test("/a/x/b")).toBe(true);
    expect(matcher.test("/a/x/y/b")).toBe(true);
    expect(matcher.test("/a/x/y/z/b")).toBe(true);
  });
});