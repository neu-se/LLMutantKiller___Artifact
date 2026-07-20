import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with object-style through stream", () => {
  it("should correctly handle object-style through streams with sink and source properties", (done) => {
    // Create an object-style through stream (has .sink and .source)
    function makeObjectThrough() {
      const obj: { sink: ((read: Function) => void) | null; source: Function | null } = {
        sink: null,
        source: null,
      };

      obj.sink = function (read: Function) {
        obj.source = function (abort: any, cb: Function) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end);
            cb(null, data * 2);
          });
        };
      };

      return obj;
    }

    const results: number[] = [];
    let ended = false;

    const source = function (abort: any, cb: Function) {
      const values = [1, 2, 3];
      let i = 0;
      return function (abort: any, cb: Function) {
        if (abort) return cb(abort);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    }();

    // Create a proper source
    const values = [1, 2, 3];
    let i = 0;
    const src = function (abort: any, cb: Function) {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const throughObj = makeObjectThrough();

    // In original: throughObj is an object, so it goes to else-if branch
    // In mutated: throughObj is treated as a function (if(true)), causing an error
    const read = pull(src, throughObj);

    const collected: number[] = [];
    function drain(abort: any, cb?: Function) {
      if (!cb) {
        // called as sink
        const readFn = abort;
        (function loop() {
          readFn(null, function (end: any, data: any) {
            if (end) {
              ended = true;
              return;
            }
            collected.push(data);
            loop();
          });
        })();
        return;
      }
    }

    // Use the result as a readable
    (function loop() {
      (read as Function)(null, function (end: any, data: any) {
        if (end) {
          expect(ended).toBe(false);
          expect(collected).toEqual([]);
          expect(results).toEqual([2, 4, 6]);
          done();
          return;
        }
        results.push(data);
        loop();
      });
    })();
  });
});