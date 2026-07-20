import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object argument", () => {
  it("should handle object streams correctly", (done) => {
    const testObject = {
      source: jest.fn((read) => {
        return function (abort, cb) {
          if (abort) return cb(abort);
          read(abort, function (end, data) {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      }),
      sink: jest.fn((read) => {
        read(null, function (end, data) {
          if (end) return;
          // Do nothing with data, just pass through
        });
      })
    };

    const sourceData = [1, 2, 3];
    let index = 0;

    const source = function (abort, cb) {
      if (abort) return cb(abort);
      if (index >= sourceData.length) return cb(true);
      cb(null, sourceData[index++]);
    };

    const result: number[] = [];
    const drain = function (read) {
      return function (abort, cb) {
        if (abort) return cb(abort);
        read(abort, function (end, data) {
          if (end) return cb(end);
          result.push(data);
          cb(null);
        });
      };
    };

    const read = pull(source, testObject, drain());

    read(null, function (end) {
      if (end) {
        expect(result).toEqual([1, 2, 3]);
        expect(testObject.sink).toHaveBeenCalled();
        done();
      }
    });
  });
});