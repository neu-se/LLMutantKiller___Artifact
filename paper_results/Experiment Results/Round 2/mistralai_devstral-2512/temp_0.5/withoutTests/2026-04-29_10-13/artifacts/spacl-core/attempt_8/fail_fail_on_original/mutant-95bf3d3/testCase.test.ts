import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle optional segments with min=0 in middle of path", () => {
    const spec = "/a/*/b";
    const matcher = new Matcher(spec);
    expect(matcher.test("/a/b")).toBe(false);
    expect(matcher.test("/a/x/b")).toBe(true);
    expect(matcher.test("/a/x/y/b")).toBe(false);
  });
});