import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should create a valid partial sink that processes a stream correctly", (done) => {
    const results: number[] = [];
    
    const map = (fn: Function) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, fn(data));
      });
    };

    // Use 5 args to trigger the default case
    const partialSink = pull(
      map((x: number) => x + 1),
      map((x: number) => x * 2),
      map((x: number) => x + 10),
      map((x: number) => x - 1),
      (read: Function) => {
        const drain = () => {
          read(null, (end: any, data: any) => {
            if (end === true) {
              expect(results).toEqual([21, 23, 25]);
              done();
              return;
            }
            if (end) { done(end); return; }
            results.push(data);
            drain();
          });
        };
        drain();
      }
    );

    let i = 0;
    const src = [1, 2, 3];
    const source = (abort: any, cb: Function) => {
      if (abort) { cb(abort); return; }
      if (i >= src.length) { cb(true); return; }
      cb(null, src[i++]);
    };

    partialSink(source);
  });
});