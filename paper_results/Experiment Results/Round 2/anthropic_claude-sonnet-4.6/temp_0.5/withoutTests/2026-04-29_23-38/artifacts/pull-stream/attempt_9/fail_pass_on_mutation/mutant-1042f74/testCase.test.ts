import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("processes items from purely async source correctly", (done) => {
    const items = [10, 20];
    let idx = 0;
    let pending: Function | null = null;
    let readCount = 0;

    function source(end: any, cb: Function) {
      readCount++;
      if (end) { cb(end); return; }
      const val = idx < items.length ? items[idx++] : null;
      pending = val !== null ? () => cb(null, val) : () => cb(true, null);
    }

    function flush() {
      if (pending) {
        const fn = pending;
        pending = null;
        fn();
        // Use setImmediate to avoid stack overflow but keep deterministic
        if (pending) setImmediate(flush);
      }
    }

    const collected: number[] = [];
    const sink = drain(
      (data: number) => { collected.push(data); },
      (err: any) => {
        expect(err).toBeNull();
        expect(collected).toEqual([10, 20]);
        done();
      }
    );

    sink(source);
    flush();
  });
});