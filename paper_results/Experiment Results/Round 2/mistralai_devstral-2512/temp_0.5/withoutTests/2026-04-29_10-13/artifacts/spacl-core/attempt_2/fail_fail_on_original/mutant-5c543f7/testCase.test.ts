import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher path specification validation", () => {
  it("should reject path with property capture containing only a dot", () => {
    const spec = "/:.";
    expect(() => new Matcher(spec)).toThrow("Path contains malformed captures");
  });
});