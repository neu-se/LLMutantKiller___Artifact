import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take through - callback called when source ends during read", () => {
  it("should call the callback with ended=true when the source stream ends while taking items", (done) => {
    // Create a source that returns one item then ends
    const items = [1, 2, 3];
    let index = 0;
    
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      if (index >= items.length) {
        cb(true); // source ended
        return;
      }
      cb(null, items[index++]);
    };

    // take(5) - take up to 5 items, but source only has 3
    // When source ends, the callback should be called with `true`
    const through = take(5);
    const reader = through(source);

    const results: any[] = [];
    
    function read() {
      reader(null, (end: any, data?: any) => {
        if (end) {
          // This should be called when source ends
          // In mutated code, cb(ended) is never called, so this never fires
          expect(end).toBe(true);
          expect(results).toEqual([1, 2, 3]);
          done();
          return;
        }
        results.push(data);
        read();
      });
    }
    
    read();
  });
});