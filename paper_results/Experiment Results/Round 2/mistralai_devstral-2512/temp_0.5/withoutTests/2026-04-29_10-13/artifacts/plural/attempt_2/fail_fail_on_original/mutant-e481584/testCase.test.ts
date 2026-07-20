import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'cello' to 'cellos'", () => {
    expect(plural("cello")).toBe("cellos");
  });
});