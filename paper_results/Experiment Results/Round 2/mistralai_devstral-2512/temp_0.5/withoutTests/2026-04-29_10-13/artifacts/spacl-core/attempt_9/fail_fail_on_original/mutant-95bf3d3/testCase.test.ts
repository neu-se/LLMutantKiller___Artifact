import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle optional wildcard with min=0 at end of path", () => {
    const spec = "/a/*";
    const matcher = new Matcher(spec);
    expect(matcher.test("/a")).toBe(false);
    expect(matcher.test("/a/b")).toBe(true);
    expect(matcher.test("/a/b/c")).toBe(false);
  });
});