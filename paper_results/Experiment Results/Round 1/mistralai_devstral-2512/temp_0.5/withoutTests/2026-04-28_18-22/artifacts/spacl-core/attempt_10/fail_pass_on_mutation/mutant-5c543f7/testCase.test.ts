import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle path specifications with property names containing exactly one character after colon", () => {
    const matcher = new Matcher("/:a");
    expect(matcher.props).toEqual(["a"]);
    expect("/value").toMatch(matcher);
  });
});