import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher edge case behavior", () => {
  it("should correctly handle empty optional segments", () => {
    const matcher = new Matcher("/a/**/b");
    expect(matcher.test("/a/b")).toBe(true);
    expect(matcher.test("/a/x/b")).toBe(true);
  });
});