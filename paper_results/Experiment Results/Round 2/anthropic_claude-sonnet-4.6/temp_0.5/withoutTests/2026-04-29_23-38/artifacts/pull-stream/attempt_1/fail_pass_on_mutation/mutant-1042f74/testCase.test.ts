import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should correctly handle synchronous streams by not calling next() prematurely when loop is still true", () => {
    const values = [1, 2, 3];
    let index = 0;
    let callCount = 0;
    
    function source(_end: any, cb: Function) {
      callCount++;
      if (_end) return cb(_end);
      if (index >= values.length) cb(true, null);
      else cb(null, values[index++]);
    }
    
    const collected: number[] = [];
    let doneErr: any = undefined;
    let doneCalled = false;
    
    const sink = drain(
      (data: number) => { collected.push(data); return undefined; },
      (err: any) => { doneErr = err; doneCalled = true; }
    );
    
    sink(source);
    
    expect(doneCalled).toBe(true);
    expect(doneErr).toBeNull();
    expect(collected).toEqual([1, 2, 3]);
    // With mutation cbed=true initially, next() might be called when loop is still true
    // causing double reads. The source should be called exactly 4 times (3 values + end)
    expect(callCount).toBe(4);
  });
});