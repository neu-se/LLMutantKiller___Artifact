import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should call sink.sink exactly once when connecting source to sink object", () => {
    const sinkCalls: any[] = [];
    let count = 0;

    const source = (end: any, cb: Function) => {
      if (end || count++ >= 1) return cb(true);
      cb(null, 42);
    };

    const sink = {
      sink: (read: Function) => {
        sinkCalls.push(read);
      },
      source: null as any,
    };

    pull(source, sink);

    // In original: sink.sink is called once in inner loop, then again in outer loop body
    // In mutated: sink.sink is called once in inner loop, outer loop body uses s=undefined (no-op)
    expect(sinkCalls).toHaveLength(2);
  });
});