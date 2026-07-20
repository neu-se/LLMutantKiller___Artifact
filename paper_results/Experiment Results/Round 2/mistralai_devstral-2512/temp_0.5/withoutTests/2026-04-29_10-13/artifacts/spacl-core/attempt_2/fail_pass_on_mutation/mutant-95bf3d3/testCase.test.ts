import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle optional wildcard patterns", () => {
    const spec = "/a/**";
    expect(() => new Matcher(spec)).not.toThrow();
    const matcher = new Matcher(spec);
    expect(matcher.test("/a")).toBe(true);
    expect(matcher.test("/a/b")).toBe(true);
    expect(matcher.test("/a/b/c")).toBe(true);
  });
});