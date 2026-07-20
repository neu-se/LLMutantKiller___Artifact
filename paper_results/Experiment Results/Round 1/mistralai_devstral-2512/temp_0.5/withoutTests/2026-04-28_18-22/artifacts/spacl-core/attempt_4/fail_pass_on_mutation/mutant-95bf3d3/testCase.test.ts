import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher optional segment behavior", () => {
  it("should correctly handle paths with optional segments at end", () => {
    const matcher = new Matcher("/a/+");
    expect(matcher.test("/a/")).toBe(false);
    expect(matcher.test("/a/x")).toBe(true);
  });
});