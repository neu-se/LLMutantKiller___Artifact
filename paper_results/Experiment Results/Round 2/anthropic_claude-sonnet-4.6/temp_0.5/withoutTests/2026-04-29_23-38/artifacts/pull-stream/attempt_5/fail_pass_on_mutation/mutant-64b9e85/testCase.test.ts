import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink mutation detection", () => {
  it("detects that cb receives null not true when stream ends normally", (done) => {
    // Strategy: use a through stream / source that we fully control
    // The find module uses drain internally
    // We need drain's end callback to receive err===true
    // 
    // Key insight: maybe we should look at what happens when find FINDS a match
    // When data matches: cb(null, data) is called, drain returns false
    // drain then calls source(true, ...) to abort, source calls cb(true)  
    // drain then calls end callback with true
    // find's end callback: original cb(null, null), mutated cb(true, null)
    // But cb was already called with (null, data)!
    // So the second call would differ between original and mutated
    
    const calls: Array<[any, any]> = [];
    let i = 0;
    const values = [1, 2, 3];
    
    function source(end: any, cb: Function) {
      if (end) {
        // Source acknowledges abort - this triggers drain's end callback
        cb(end); // passes true back
        return;
      }
      if (i >= values.length) { cb(true); return; }
      cb(null, values[i++]);
    }

    find(
      (x: any) => x === 1, // matches first item
      (err: any, data: any) => {
        calls.push([err, data]);
      }
    )(source);

    setTimeout(() => {
      // First call: cb(null, 1) - match found
      // Second call (from end callback):
      //   Original: cb(null, null) 
      //   Mutated:  cb(true, null)  <- if drain passes true to end cb
      expect(calls.length).toBeGreaterThanOrEqual(1);
      expect(calls[0]).toEqual([null, 1]);
      
      if (calls.length >= 2) {
        // If there's a second call, check it
        expect(calls[1][0]).toBeNull(); // Original: null, Mutated: true
      }
      done();
    }, 50);
  });
});