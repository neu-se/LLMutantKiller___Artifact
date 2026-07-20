const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream with object stream", () => {
  it("should handle object streams correctly", (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, { value: 1 });
    };

    const objectStream = {
      source: source,
      sink: (read: any) => {
        read(null, (end: any, data: any) => {
          if (end) return;
          if (data && typeof data === 'object') {
            return;
          }
        });
      }
    };

    pull(
      source,
      objectStream,
      pull.collect((err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toEqual([{ value: 1 }]);
        done();
      })
    );
  });
});