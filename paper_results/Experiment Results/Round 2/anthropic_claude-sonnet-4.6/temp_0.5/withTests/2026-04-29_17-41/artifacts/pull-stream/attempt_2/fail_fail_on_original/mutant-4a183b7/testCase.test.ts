import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const pullCollect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

describe("pull with duplex stream as first argument", () => {
  it("should extract source from a duplex stream passed as the first argument", (done) => {
    const values = [1, 2, 3];
    let i = 0;
    const sourceRead = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // A duplex-like object where source is a function
    // When passed as first arg to pull, original code sets read = read.source
    // Mutated code skips this, leaving read as the duplex object
    const duplex = {
      sink: (_read: Function) => {},
      source: sourceRead,
    };

    // collect is a sink that takes a read function and calls it repeatedly
    const collectSink = pullCollect((err: any, ary: number[]) => {
      expect(err).toBeFalsy();
      expect(ary).toEqual([1, 2, 3]);
      done();
    });

    // In original: pull extracts duplex.source as read, then passes it to collectSink
    // In mutated: pull keeps duplex as read, collectSink receives the duplex object (not a function)
    // which will cause incorrect behavior
    pull(duplex, collectSink);
  });
});