const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull with duplex stream as first argument", () => {
  it("should extract source from a duplex stream passed as first argument and pipe it correctly", (done) => {
    const values = [1, 2, 3];
    let i = 0;

    // A simple source read function
    const sourceRead = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // A duplex-like object where source is a function
    // When passed as first arg to pull, original code sets read = read.source
    // Mutated code skips this, leaving read as the duplex object itself
    const duplex = {
      sink: (_read: Function) => {},
      source: sourceRead,
    };

    // A manual collect sink that reads from whatever `read` is passed to it
    const collectSink = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      const collected: number[] = [];
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

    // In original: pull extracts duplex.source as read, then passes it to collectSink
    // In mutated: pull keeps duplex as read, collectSink receives the duplex object (not a function)
    // which will cause incorrect behavior (calling duplex as a function will throw)
    pull(duplex, collectSink);
  });
});