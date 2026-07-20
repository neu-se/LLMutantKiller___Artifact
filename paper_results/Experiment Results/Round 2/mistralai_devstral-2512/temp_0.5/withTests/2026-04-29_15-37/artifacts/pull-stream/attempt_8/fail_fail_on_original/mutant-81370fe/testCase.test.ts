import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object argument", () => {
  it("should handle object streams with sink and source correctly", (done) => {
    const source = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        if (abort) return cb(abort);
        cb(null, 1);
      }
    };

    const through = {
      source: null as any,
      sink: function (read: any) {
        return function (abort: any, cb: (end: any, data?: any) => void) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end);
            cb(null, data * 2);
          });
        };
      }
    };

    const result: number[] = [];
    const drain = function (read: any) {
      return function (abort: any, cb: (end: any, data?: any) => void) {
        read(abort, function (end: any, data: any) {
          if (end) return cb(end);
          result.push(data);
          cb(null, data);
        });
      };
    };

    const stream = pull(source, through, drain);
    stream(null, function (end: any, data: any) {
      if (end) {
        setTimeout(() => {
          try {
            expect(result).toEqual([2]);
            done();
          } catch (err) {
            done(err);
          }
        }, 100);
      }
    });
  });
});