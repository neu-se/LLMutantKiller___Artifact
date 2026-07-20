import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with duplex stream as first argument", () => {
  it("should unwrap source from an object with a source function when passed as first argument", (done) => {
    // Create a simple source that emits values [1, 2, 3]
    const values = [1, 2, 3];
    let i = 0;
    const sourceRead = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Create a duplex-like object where the first argument has a .source function
    // This tests the branch: if (read && typeof read.source === 'function') { read = read.source }
    const duplexLike = {
      source: sourceRead,
      sink: (read: Function) => {
        // sink is not used in this test path
      }
    };

    // When duplexLike is passed as the first argument, pull should unwrap duplexLike.source
    // and use it as the read function for subsequent through/sink stages
    const collected: number[] = [];
    const sink = (read: Function) => {
      const loop = () => {
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(collected).toEqual([1, 2, 3]);
            done();
            return;
          }
          if (end) {
            done(end);
            return;
          }
          collected.push(data);
          loop();
        });
      };
      loop();
    };

    // In original: duplexLike.source is extracted as read, then sink is applied
    // In mutated: duplexLike is used as read directly (not a function), so sink gets a non-function
    pull(duplexLike, sink);
  });
});