import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort() before source is connected", () => {
  it("should not throw when abort is called before the sink is connected to a source", () => {
    const sink = drain(
      (data: unknown) => {},
      (err: unknown) => {}
    );

    // Calling abort before the sink has been connected to a read source
    // In the original: if(read) check prevents calling read() when read is undefined
    // In the mutated: if(true) always tries to call read() which is undefined, causing a TypeError
    expect(() => {
      sink.abort();
    }).not.toThrow();
  });
});