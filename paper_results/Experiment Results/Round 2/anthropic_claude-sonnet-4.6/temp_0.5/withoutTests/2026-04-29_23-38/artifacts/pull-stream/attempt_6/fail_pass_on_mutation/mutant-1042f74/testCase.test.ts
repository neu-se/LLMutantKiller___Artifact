import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should not invoke next() when loop is still true during synchronous streaming", () => {
    // This test checks that when a sync source provides data and then ends,
    // the while loop handles it without extra next() calls
    
    const events: string[] = [];
    let callCount = 0;
    
    function source(end: any, cb: Function) {
      callCount++;
      const n = callCount;
      events.push(`read-${n}`);
      if (end) {
        events.push(`end-ack-${n}`);
        cb(end);
        return;
      }
      if (n === 1) cb(null, 'a');
      else cb(true, null); // end on second read
    }
    
    const sink = drain(
      (data: string) => { events.push(`op-${data}`); },
      (err: any) => { events.push(`done-${err}`); }
    );
    
    sink(source);
    
    expect(events).toEqual(['read-1', 'op-a', 'read-2', 'done-null']);
    expect(callCount).toBe(2);
  });
});