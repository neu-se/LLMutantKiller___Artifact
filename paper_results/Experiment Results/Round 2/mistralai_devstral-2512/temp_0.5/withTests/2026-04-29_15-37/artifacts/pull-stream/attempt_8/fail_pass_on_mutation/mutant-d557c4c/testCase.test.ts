const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

describe("pull stream with object argument", () => {
  it("should handle object arguments correctly", (done) => {
    const testObject = { value: 42 };
    let callCount = 0;

    pull(
      values([1, 2, 3]),
      (read: any) => {
        return (end: any, cb: any) => {
          read(end, (err: any, data: any) => {
            if (err) return cb(err);
            if (data === undefined) return cb(true);
            callCount++;
            // Return an object that is not a function
            cb(null, testObject);
          });
        };
      },
      (read: any) => {
        return (end: any, cb: any) => {
          read(end, (err: any, data: any) => {
            if (err) return cb(err);
            if (data === undefined) return cb(true);
            callCount++;
            // Return an object that is not a function
            cb(null, testObject);
          });
        };
      },
      (read: any) => {
        return (end: any, cb: any) => {
          read(end, (err: any, data: any) => {
            if (err) return cb(err);
            if (data === undefined) return cb(true);
            callCount++;
            // Return an object that is not a function
            cb(null, testObject);
          });
        };
      },
      collect((err: any, collected: any) => {
        try {
          expect(err).toBeNull();
          expect(collected).toEqual([testObject, testObject, testObject]);
          expect(callCount).toBe(9);
          done();
        } catch (e) {
          done(e);
        }
      })
    );
  });
});