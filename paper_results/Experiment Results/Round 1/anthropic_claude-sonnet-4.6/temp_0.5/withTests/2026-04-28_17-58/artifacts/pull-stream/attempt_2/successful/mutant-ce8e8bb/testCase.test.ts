import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with object-style through stream", () => {
  it("should correctly handle an object stream with sink and source properties", (done) => {
    const values = [1, 2, 3];
    let i = 0;

    const source = function(abort: any, cb: Function) {
      if (abort || i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    let _read: Function;
    const objectThrough = {
      sink: function(read: Function) {
        _read = read;
      },
      source: function(abort: any, cb: Function) {
        _read(abort, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      }
    };

    const read = pull(source, objectThrough);

    const collected: number[] = [];
    function next(end: any, data: any) {
      if (end) {
        expect(collected).toEqual([2, 4, 6]);
        done();
        return;
      }
      if (data !== undefined) collected.push(data);
      read(null, next);
    }
    read(null, next);
  });
});