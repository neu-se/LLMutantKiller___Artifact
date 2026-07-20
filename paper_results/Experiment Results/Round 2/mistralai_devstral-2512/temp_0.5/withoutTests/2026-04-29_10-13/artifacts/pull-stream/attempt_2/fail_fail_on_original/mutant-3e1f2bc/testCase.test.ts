import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with object sink", () => {
  it("should process object sinks correctly", () => {
    const source = {
      source: () => "data",
      sink: jest.fn()
    };

    const sink = {
      source: () => "transformed",
      sink: jest.fn()
    };

    const result = pull(source, sink);
    expect(result).toBe("transformed");
    expect(sink.sink).toHaveBeenCalledWith(source.source);
  });
});