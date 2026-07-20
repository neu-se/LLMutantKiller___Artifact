import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values source with array input", () => {
  it("should correctly stream values from an array without converting via Object.keys", (done) => {
    const arr = [10, 20, 30];
    const source = values(arr);
    const results: number[] = [];
    
    function read() {
      source(null, (end: any, val: any) => {
        if (end === true) {
          expect(results).toEqual([10, 20, 30]);
          done();
        } else if (end) {
          done(end);
        } else {
          results.push(val);
          read();
        }
      });
    }
    read();
  });
});