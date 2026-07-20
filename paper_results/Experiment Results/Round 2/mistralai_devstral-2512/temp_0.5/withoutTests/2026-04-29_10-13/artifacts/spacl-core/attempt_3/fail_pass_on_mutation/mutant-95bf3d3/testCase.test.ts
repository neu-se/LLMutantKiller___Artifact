import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should reject empty path segments when min is 0", () => {
    expect(() => new Matcher("/a/*/b")).not.toThrow();
    const matcher = new Matcher("/a/*/b");
    expect(matcher.test("/a/b")).toBe(false);
    expect(matcher.test("/a/x/b")).toBe(true);
  });
});