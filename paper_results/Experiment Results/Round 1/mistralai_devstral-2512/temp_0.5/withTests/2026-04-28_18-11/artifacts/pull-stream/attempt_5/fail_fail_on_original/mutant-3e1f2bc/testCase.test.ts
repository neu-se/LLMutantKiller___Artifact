const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream mutation test", () => {
  it("should correctly handle object streams with sink/source methods", (done) => {
    const testObject = {
      source: function (read: any) {
        return function (abort: any, cb: any) {
          if (abort) return cb(abort);
          read(abort, function (end: any, data: any) {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      },
      sink: function (read: any) {
        read(null, function (end: any, data: any) {
          if (end) return;
        });
      }
    };

    const sourceData = [1, 2, 3];
    let index = 0;

    const source = function (abort: any, cb: any) {
      if (abort) return cb(abort);
      if (index >= sourceData.length) return cb(true);
      cb(null, sourceData[index++]);
    };

    const result: number[] = [];
    const drain = function (read: any) {
      return function (abort: any, cb: any) {
        if (abort) return cb(abort);
        read(abort, function (end: any, data: any) {
          if (end) return cb(end);
          result.push(data);
          cb(null);
        });
      };
    };

    const read = pull(source, testObject, drain);

    read(null, function (end: any) {
      if (end) {
        expect(result).toEqual([1, 2, 3]);
        done();
      }
    });
  });
});