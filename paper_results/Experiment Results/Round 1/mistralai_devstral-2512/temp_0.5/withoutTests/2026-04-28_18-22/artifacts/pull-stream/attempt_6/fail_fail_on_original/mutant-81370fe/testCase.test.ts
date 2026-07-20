const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object sink", () => {
  it("should correctly handle object sinks with source and sink methods", () => {
    const source = {
      source: () => "data",
      sink: (read: any) => {
        return () => read().toUpperCase();
      }
    };

    const result = pull(source);
    const output = result();
    expect(output).toBe("DATA");
  });
});