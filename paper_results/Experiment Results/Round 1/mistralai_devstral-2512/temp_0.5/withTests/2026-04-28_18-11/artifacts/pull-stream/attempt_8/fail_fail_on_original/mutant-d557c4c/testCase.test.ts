import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object argument", () => {
  it("should handle object arguments correctly", (done) => {
    const testObject = {
      source: (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
        return (abort: any, cb: (end: any, data?: any) => void) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      },
      sink: (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
        return (abort: any, cb: (end: any, data?: any) => void) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      }
    };

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, "data");
    };

    const collect = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      const results: any[] = [];
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            if (end === true) {
              cb(null, results);
            } else {
              cb(end);
            }
          } else {
            results.push(data);
            cb(null, results);
          }
        });
      };
    };

    const pipeline = pull(
      source,
      testObject,
      collect
    );

    pipeline(null, (end: any, result: any) => {
      expect(end).toBeNull();
      expect(result).toEqual(["data"]);
      done();
    });
  }, 100);
});