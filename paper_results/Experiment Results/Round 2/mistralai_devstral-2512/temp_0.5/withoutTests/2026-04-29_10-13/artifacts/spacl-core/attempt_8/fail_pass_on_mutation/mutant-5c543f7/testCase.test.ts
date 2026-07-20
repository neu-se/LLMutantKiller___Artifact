import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher property capture behavior", () => {
  it("should handle property capture with dot followed by text", () => {
    const spec = "/:prop.text";
    const matcher = new Matcher(spec);
    expect(matcher.props).toContain("prop.text");
  });
});