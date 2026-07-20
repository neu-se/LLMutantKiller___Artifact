import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle path specifications with property names containing only a colon", () => {
    const matcher = new Matcher("/:x");
    expect(matcher.props).toEqual(["x"]);
    expect("/value".match(matcher)).not.toBeNull();
  });
});