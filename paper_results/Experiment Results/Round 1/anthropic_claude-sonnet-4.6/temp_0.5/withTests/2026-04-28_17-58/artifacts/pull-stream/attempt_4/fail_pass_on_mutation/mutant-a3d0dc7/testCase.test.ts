import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should return a readable function that yields array elements", (done) => {
    // In original: if(abort) is false (abort undefined in outer scope), continues to return the reader function
    // In mutated: if(true) executes abortCb(undefined, undefined, onAbort) and returns its result (undefined)
    // so the returned value is not a function and calling read(null, cb) would throw
    const read = values([1, 2, 3]);

    expect(typeof read).toBe("function");

    let results: number[] = [];
    
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      results.push(data);
      read(null, (err2: any, data2: any) => {
        expect(err2).toBeNull();
        results.push(data2);
        expect(results).toEqual([1, 2]);
        done();
      });
    });
  });
});