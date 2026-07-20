import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher property capture validation", () => {
  it("should correctly handle property captures starting with dot", () => {
    const spec = "/:.test";
    const matcher = new Matcher(spec);
    expect(matcher.props).toEqual([".test"]);
  });
});