import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort() before read is assigned", () => {
  it("should not throw when abort is called before sink is connected to a source", () => {
    const sink = drain(
      (data: unknown) => true,
      (err: Error | null) => {}
    );

    // Call abort before connecting to any source (read is not yet assigned)
    // In the original code: if(read) return read(abort, cb || function () {})
    // read is undefined, so the condition is false and nothing happens
    // In the mutated code: if(true) return read(abort, cb || function () {})
    // read is undefined, so calling read() throws a TypeError
    expect(() => {
      sink.abort();
    }).not.toThrow();
  });
});