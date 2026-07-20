import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'bacterium' to 'bacteria'", () => {
    expect(plural("bacterium")).toBe("bacteria");
  });
});