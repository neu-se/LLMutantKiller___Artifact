const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object sink", () => {
  it("should correctly process object sinks by calling their sink method", () => {
    const source = {
      source: () => "data",
      sink: jest.fn()
    };

    const sink = {
      source: () => "transformed",
      sink: jest.fn()
    };

    pull(source, sink);
    expect(sink.sink).toHaveBeenCalledWith(source.source);
  });
});