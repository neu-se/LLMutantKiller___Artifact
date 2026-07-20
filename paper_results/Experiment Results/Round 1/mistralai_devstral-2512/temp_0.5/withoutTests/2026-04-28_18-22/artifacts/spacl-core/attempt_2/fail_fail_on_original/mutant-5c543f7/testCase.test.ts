import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher", () => {
  it("should correctly handle path specifications with empty property names", () => {
    expect(() => new Matcher("/:")).not.toThrow();
    const matcher = new Matcher("/:");
    expect(matcher.props).toEqual([""]);
    expect("/value".match(matcher)).not.toBeNull();
  });
});