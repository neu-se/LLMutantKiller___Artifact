import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js"

describe("take", () => {
  it("should only abort the source once when terminate is called", (done) => {
    const items = [1, 2, 3];
    let readCount = 0;
    let abortCount = 0;

    const source = (end: any, cb: Function) => {
      if (end) {
        abortCount++;
        cb(true);
        return;
      }
      if (readCount >= items.length) { cb(true); return; }
      cb(null, items[readCount++]);
    };

    // take(1) with last=true: reads 1 item, passes it through, then terminates
    const through = take(1)(source);
    const results: number[] = [];

    through(null, (end: any, data: any) => {
      if (!end) results.push(data);
      // After getting the first item, read again to trigger terminate
      through(null, (end2: any, data2: any) => {
        // After terminate, read one more time
        through(null, (end3: any, data3: any) => {
          expect(results).toEqual([1]);
          // Original: abortCount should be 1 (terminate called once, then last=false so no more terminate)
          // Mutated: abortCount would be 2 (terminate called twice because last stays true)
          expect(abortCount).toBe(1);
          done();
        });
      });
    });
  });
});