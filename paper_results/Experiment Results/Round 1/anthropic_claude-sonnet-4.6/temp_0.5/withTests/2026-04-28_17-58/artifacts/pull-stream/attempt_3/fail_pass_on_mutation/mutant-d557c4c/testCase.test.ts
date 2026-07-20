import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull', () => {
  it('should not throw when a plain through function without sink/source is used', () => {
    const source = (() => {
      const values = [1, 2, 3];
      let i = 0;
      return (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) return cb(abort);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    })();

    const through = (read: Function) => {
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    };

    // through is a plain function with no .sink property
    // Original: works fine, skips .sink/.source handling
    // Mutated: tries to call through.sink(read) which throws TypeError
    expect(() => {
      const read = pull(source, through);
      // drain the stream to trigger execution
      let done = false;
      const drain = (abort: any, cb: Function) => {};
      // Force evaluation by calling read
      read(null, function next(end: any, data: any) {
        if (!end) read(null, next);
      });
    }).not.toThrow();
  });
});