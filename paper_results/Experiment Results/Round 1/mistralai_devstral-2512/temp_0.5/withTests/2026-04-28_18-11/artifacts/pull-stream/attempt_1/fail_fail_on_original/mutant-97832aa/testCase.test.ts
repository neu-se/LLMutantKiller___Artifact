import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object handling", () => {
  it("should handle null values correctly in stream pipeline", (done) => {
    const nullStream = {
      source: function (abort, cb) {
        if (abort) return cb(abort);
        cb(null, null);
      },
      sink: function (read) {
        return function (abort, cb) {
          if (abort) return cb(abort);
          read(abort, function (end, data) {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      }
    };

    pull(
      nullStream.source,
      nullStream,
      pull.collect((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual([null]);
        done();
      })
    );
  });
});