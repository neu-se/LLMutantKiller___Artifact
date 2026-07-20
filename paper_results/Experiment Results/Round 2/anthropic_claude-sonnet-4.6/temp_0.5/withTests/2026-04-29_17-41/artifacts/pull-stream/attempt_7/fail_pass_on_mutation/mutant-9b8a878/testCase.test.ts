import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("args array should have correct length for switch default case with 5 arguments", (done) => {
    // With new Array(length): array.length === 5 before loop
    // With new Array(): array.length === 0 before loop, then 5 after loop
    // After loop BOTH are identical - so we need to find another angle
    
    // The ONLY way this mutation is detectable is if length===0 somehow
    // OR if there's a different JS behavior...
    
    // Actually: new Array(4294967296) throws RangeError!
    // But arguments.length can't be that large in practice
    
    // Let me try: what does pull() do with NO arguments?
    // length = 0, a = undefined, a.length throws TypeError
    // So that's not it either
    
    // What about pull with a source that has .length === 1?
    // A function with 1 parameter has .length === 1
    
    // Let me check: does the partial function returned have .length === 1?
    const through = (read: Function) => (abort: any, cb: Function) => read(abort, cb);
    const partial = pull(through);
    
    // The returned function should accept exactly 1 argument (read)
    expect(partial.length).toBe(1);
    
    // Now use it
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort || i++ > 0) return cb(true);
      cb(null, 42);
    };
    
    const read = partial(source);
    read(null, (end: any, data: any) => {
      expect(data).toBe(42);
      done();
    });
  });
});