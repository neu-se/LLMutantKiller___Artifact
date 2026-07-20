import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should handle pipeline where first argument has length 1 and produces correct output through all transforms", (done) => {
    // Test with object that has .source property to exercise different code path
    const results: number[] = [];
    
    const makeThrough = (n: number) => {
      const fn = (read: Function) => (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data + n);
        });
      };
      return fn;
    };

    // Create a duplex object with source/sink
    let sourceRead: Function;
    const duplex = {
      sink: (read: Function) => { sourceRead = read; },
      source: (abort: any, cb: Function) => {
        sourceRead(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data * 10);
        });
      }
    };

    // duplex.source.length === 2, not 1, so won't trigger partial branch
    // Need something with .length === 1
    
    // makeThrough(1).length === 1 triggers partial branch
    const partial = pull(makeThrough(1));
    expect(typeof partial).toBe("function");
    
    let i = 0;
    const src = [5];
    const source = (abort: any, cb: Function) => {
      if (abort || i >= src.length) return cb(true);
      cb(null, src[i++]);
    };

    const read = partial(source);
    read(null, (end: any, data: any) => {
      expect(data).toBe(6);
      results.push(data);
      read(null, (end2: any) => {
        expect(end2).toBeTruthy();
        expect(results).toEqual([6]);
        done();
      });
    });
  });
});