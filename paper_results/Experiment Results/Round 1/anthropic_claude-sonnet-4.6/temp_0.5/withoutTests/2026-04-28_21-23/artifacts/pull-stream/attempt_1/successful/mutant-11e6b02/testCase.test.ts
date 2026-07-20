import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take - terminate sets last to false", () => {
  it("should not call read(true) more than once after stream ends with last=true", () => {
    // take(n) sets last=true, meaning the n-th item should still pass
    // After terminate is called, last should be false so subsequent reads don't re-terminate
    
    const items = [1, 2, 3, 4, 5];
    let index = 0;
    let abortCallCount = 0;

    // Source that tracks abort calls
    function source(end: any, cb: Function) {
      if (end) {
        abortCallCount++;
        cb(end);
        return;
      }
      if (index >= items.length) {
        cb(true);
        return;
      }
      cb(null, items[index++]);
    }

    // take(2) means read 2 items (last=true, so the item that fails test still passes)
    const through = take(2)(source);

    const results: number[] = [];
    
    function drain(end?: any) {
      through(end || null, function(err: any, data: any) {
        if (err) return; // stream ended
        results.push(data);
        drain();
      });
    }

    // Read all items
    through(null, function(err: any, data: any) {
      if (!err) results.push(data);
      through(null, function(err2: any, data2: any) {
        if (!err2) results.push(data2);
        // Now stream should be ended, read again - this triggers terminate
        through(null, function(err3: any, data3: any) {
          // err3 should be truthy (ended)
          // Now read one more time - with original, last=false so cb(ended) is called directly
          // With mutation, last=true so terminate is called AGAIN
          through(null, function(err4: any, data4: any) {
            // This final read should NOT trigger another abort
            expect(abortCallCount).toBe(1); // Only one abort call
          });
        });
      });
    });
  });
});