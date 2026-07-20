import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values source", () => {
  it("should preserve sparse array holes when input is an array", (done) => {
    const arr = [1, , 3] as any[];  // sparse array
    const source = values(arr);
    const results: any[] = [];
    function read() {
      source(null, (end: any, val: any) => {
        if (end === true) {
          expect(results).toHaveLength(3); // original preserves length=3, mutated gets length=2
          done();
        } else if (end) { done(end); } else { results.push(val); read(); }
      });
    }
    read();
  });
});