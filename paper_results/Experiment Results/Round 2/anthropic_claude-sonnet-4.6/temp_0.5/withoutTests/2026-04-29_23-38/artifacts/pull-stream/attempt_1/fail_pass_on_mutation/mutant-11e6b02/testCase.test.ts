import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js"

describe("take", () => {
  it("should not call terminate multiple times when last=true and stream is already ended", (done) => {
    // Use take(2) which sets last=true
    // The stream should properly terminate after reading 2 items
    // With the mutation, last stays true causing infinite terminate loops
    
    const items = [1, 2, 3, 4, 5];
    let readCount = 0;
    
    const source = (end: any, cb: Function) => {
      if (end) {
        cb(true);
        return;
      }
      if (readCount >= items.length) {
        cb(true);
        return;
      }
      cb(null, items[readCount++]);
    };
    
    const through = take(2)(source);
    const results: number[] = [];
    
    function drain() {
      through(null, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual([1, 2]);
          done();
          return;
        }
        results.push(data);
        drain();
      });
    }
    
    drain();
  });
});