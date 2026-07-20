import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural with regex rule having string result", () => {
  it("should return string result directly when regex rule matches with non-function result", () => {
    plural.addRule(/^testword$/i, "testwords");
    expect(plural("testword")).toBe("testwords");
  });
});