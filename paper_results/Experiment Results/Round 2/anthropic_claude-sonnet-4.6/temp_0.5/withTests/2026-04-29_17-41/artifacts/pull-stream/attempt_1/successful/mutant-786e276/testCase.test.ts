import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with duplex stream as first argument", () => {
  it("should unwrap source from a duplex object passed as first argument", (done) => {
    // Create a simple source that emits values 1, 2, 3
    let i = 0;
    const values = [1, 2, 3];
    const sourceRead = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Create a duplex object where source is a function
    const duplex = {
      sink: (read: Function) => {
        // sink does nothing in this test
      },
      source: sourceRead,
    };

    // When pull receives a duplex object as first argument,
    // it should use duplex.source as the read function.
    // The result should be a readable stream (function with 2 args).
    const result = pull(duplex);

    // In original code: read = duplex.source (a function), so result is a readable function
    // In mutated code: read stays as duplex object, so result is the duplex object itself
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);

    // Further verify it actually reads values correctly
    const collected: number[] = [];
    const readAll = (end: any, data: any) => {
      if (end) {
        expect(collected).toEqual([1, 2, 3]);
        done();
        return;
      }
      collected.push(data);
      result(null, readAll);
    };
    result(null, readAll);
  });
});