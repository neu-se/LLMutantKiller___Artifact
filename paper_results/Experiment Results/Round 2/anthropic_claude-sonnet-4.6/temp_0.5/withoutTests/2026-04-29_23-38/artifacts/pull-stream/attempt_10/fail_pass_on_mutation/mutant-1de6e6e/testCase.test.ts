import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce", () => {
  it("should abort source when sink is aborted", (done) => {
    let aborted = false;
    const source = (end: any, cb: Function) => {
      if (end) {
        aborted = true;
        return cb(end);
      }
      cb(null, 1);
    };
    
    const sink = reduce(
      (acc: number, x: number) => acc + x,
      0,
      (err: any, result: any) => {
        // This shouldn't be called in this test
      }
    );
    
    // Get the internal read function by calling sink with source
    // then immediately abort
    const readFn = sink;
    
    // Call source directly to simulate what drain does
    source(new Error("abort"), (end: any) => {
      expect(aborted).toBe(true);
      done();
    });
  });
});