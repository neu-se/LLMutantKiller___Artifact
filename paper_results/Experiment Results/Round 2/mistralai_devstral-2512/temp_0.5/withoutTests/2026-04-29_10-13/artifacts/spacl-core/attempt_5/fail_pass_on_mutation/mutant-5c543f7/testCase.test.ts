import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher property capture behavior", () => {
  it("should not capture empty property names in path segments", () => {
    const spec = "/:";
    expect(() => new Matcher(spec)).toThrow();
  });
});