import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull default case with 5+ through-streams as partial sink", () => {
  it("should correctly process a pipeline with 5 through-streams triggering the default switch case", (done) => {
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + 1);
      });
    };

    // 5 through-stream functions => triggers the default case in the switch
    const partialPipeline = pull(double, addOne, double, addOne, double);

    expect(typeof partialPipeline).toBe("function");
    expect(partialPipeline.length).toBe(1);

    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Apply partial pipeline to source - on mutated code this returns undefined
    const read = partialPipeline(source);

    expect(typeof read).toBe("function");

    const results: number[] = [];
    const next = (end: any, data: any) => {
      if (end === true) {
        // 1 -> *2=2 -> +1=3 -> *2=6 -> +1=7 -> *2=14
        // 2 -> *2=4 -> +1=5 -> *2=10 -> +1=11 -> *2=22
        // 3 -> *2=6 -> +1=7 -> *2=14 -> +1=15 -> *2=30
        expect(results).toEqual([14, 22, 30]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data);
      read(null, next);
    };

    read(null, next);
  });
});