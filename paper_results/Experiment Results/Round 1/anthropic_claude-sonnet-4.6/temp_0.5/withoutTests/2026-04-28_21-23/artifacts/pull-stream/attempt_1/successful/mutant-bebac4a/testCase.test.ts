import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort() before read is set", () => {
  it("should not throw when abort is called before the sink is connected to a source", () => {
    const sink = drain(
      (_data: unknown) => {},
      (_err: Error | null) => {}
    );

    // Call abort before the sink has been connected to any source.
    // In the original code, `read` is undefined so `if(read)` is false and nothing happens.
    // In the mutated code, `if(true)` causes `read(abort, cb)` to be called where `read` is undefined,
    // which throws a TypeError.
    expect(() => {
      sink.abort(null, () => {});
    }).not.toThrow();
  });
});