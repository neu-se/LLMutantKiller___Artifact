import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with duplex stream as first argument", () => {
  it("should extract source from a duplex stream passed as the first argument", (done) => {
    // Create a simple source that emits values 1, 2, 3
    const values = [1, 2, 3];
    let i = 0;
    const sourceRead = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Create a duplex-like object where source is a function
    // This simulates passing a duplex stream as the first argument to pull
    const duplex = {
      sink: (read: Function) => {
        // sink just reads everything and discards
      },
      source: sourceRead,
    };

    // When pull receives a duplex as first arg, it should use duplex.source
    // as the read function for subsequent pipeline stages
    const collected: number[] = [];

    const read = pull(duplex, pull.collect((err: any, ary: number[]) => {
      expect(err).toBeFalsy();
      expect(ary).toEqual([1, 2, 3]);
      done();
    }));
  });
});