const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object sink", () => {
  it("should correctly handle object sinks with source and sink methods", () => {
    let sinkCalled = false;
    const source = {
      source: () => "data",
      sink: (read: any) => {
        sinkCalled = true;
        return read;
      }
    };

    const result = pull(source);
    expect(sinkCalled).toBe(true);
    expect(result()).toBe("data");
  });
});