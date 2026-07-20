import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should collect values through a complete pipeline", (done) => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;
    
    const source = (abort: any, cb: Function) => {
      if (abort || i >= values.length) return cb(true);
      cb(null, values[i++]);
    };
    
    const results: number[] = [];
    
    pull(
      source,
      (read: Function) => (abort: any, cb: Function) => {
        read(abort, (end: any, data: number) => {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      },
      (read: Function) => {
        (function drain() {
          read(null, (end: any, data: number) => {
            if (end) {
              expect(results).toEqual([2, 4, 6, 8, 10]);
              done();
              return;
            }
            results.push(data);
            drain();
          });
        })();
      }
    );
  });
});