import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 3 through streams as partial application", () => {
  it("should apply all 3 transforms when pull is partially applied with 3 through functions", (done) => {
    let i = 0;
    const values = [10];

    function source(end: any, cb: Function) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    }

    const applied: string[] = [];

    function t1(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          applied.push('t1');
          cb(null, data + 1);
        });
      };
    }

    function t2(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          applied.push('t2');
          cb(null, data + 100);
        });
      };
    }

    function t3(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          applied.push('t3');
          cb(null, data + 10000);
        });
      };
    }

    // Partial application with exactly 3 through streams -> length === 3
    const pipeline = pull(t1, t2, t3);
    const piped = pipeline(source);

    piped(null, function(end: any, data: any) {
      // Original: t1, t2, t3 all applied -> 10 + 1 + 100 + 10000 = 10111
      // Mutated: t3 skipped -> 10 + 1 + 100 = 111
      expect(data).toBe(10111);
      expect(applied).toEqual(['t1', 't2', 't3']);
      done();
    });
  });
});