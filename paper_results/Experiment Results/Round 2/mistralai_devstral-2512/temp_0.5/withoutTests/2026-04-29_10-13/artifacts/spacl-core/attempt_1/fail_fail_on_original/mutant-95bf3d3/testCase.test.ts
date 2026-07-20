import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher", () => {
  it("should reject path with optional wildcard at the end when min is 0", () => {
    const spec = "/a/*";
    expect(() => new Matcher(spec)).not.toThrow();
    const matcher = new Matcher(spec);
    expect(matcher.test("/a")).toBe(true);
    expect(matcher.test("/a/b")).toBe(true);
    expect(matcher.test("/a/b/c")).toBe(false);
  });
});