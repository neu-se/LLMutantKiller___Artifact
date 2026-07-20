import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher", () => {
  it("should correctly handle path specifications with single-character property names", () => {
    const matcher = new Matcher("/:a");
    expect(matcher.props).toEqual(["a"]);
    expect("/value".match(matcher)).not.toBeNull();
  });
});