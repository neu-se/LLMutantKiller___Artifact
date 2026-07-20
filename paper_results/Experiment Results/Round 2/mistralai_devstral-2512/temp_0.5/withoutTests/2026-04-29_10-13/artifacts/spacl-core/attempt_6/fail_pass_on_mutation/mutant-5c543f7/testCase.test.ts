import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher property capture validation", () => {
  it("should correctly identify property captures with dots", () => {
    const spec = "/:prop.";
    const matcher = new Matcher(spec);
    expect(matcher.props).toEqual(["prop."]);
  });
});