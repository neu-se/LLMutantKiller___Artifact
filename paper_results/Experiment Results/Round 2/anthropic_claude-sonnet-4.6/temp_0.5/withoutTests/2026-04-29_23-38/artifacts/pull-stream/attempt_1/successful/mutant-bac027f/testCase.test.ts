import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with source object as first argument", () => {
  it("should unwrap source from an object with a source property when passed as first argument", () => {
    // Create a simple source that emits values 1, 2, 3 then ends
    const values = [1, 2, 3];
    let index = 0;
    
    const source = function(end: any, cb: Function) {
      if (end) return cb(end);
      if (index >= values.length) return cb(true);
      cb(null, values[index++]);
    };
    
    // Create an object that has both source and sink (like a through stream)
    // When passed as first argument to pull, it should use its .source property
    const sourceObject = {
      source: source,
      sink: function(read: Function) {
        // This sink just connects to the source directly (passthrough)
        sourceObject.source = read;
      }
    };
    
    // Create a simple sink that collects values
    const collected: number[] = [];
    let done = false;
    
    const sink = function(read: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end === true) {
            done = true;
            return;
          }
          if (end) throw end;
          collected.push(data);
          next();
        });
      }
      next();
    };
    
    // When sourceObject is passed as first argument, pull should extract sourceObject.source
    // and use it as the read function. Then the sink should receive data from it.
    pull(sourceObject, sink);
    
    // If the mutation is active (if false), sourceObject itself is used as read,
    // which is an object, not a function - so the sink won't work properly
    // and collected will remain empty
    expect(collected).toEqual([1, 2, 3]);
    expect(done).toBe(true);
  });
});