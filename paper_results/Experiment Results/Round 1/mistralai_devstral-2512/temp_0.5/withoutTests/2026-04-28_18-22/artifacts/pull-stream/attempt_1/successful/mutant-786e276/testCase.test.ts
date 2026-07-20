import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function behavior with source property", () => {
  it("should handle read.source when it is a function", () => {
    const sourceFunc = () => "source data";
    const read = { source: sourceFunc };
    const result = pull(read);
    expect(result).toBe(sourceFunc);
  });
});