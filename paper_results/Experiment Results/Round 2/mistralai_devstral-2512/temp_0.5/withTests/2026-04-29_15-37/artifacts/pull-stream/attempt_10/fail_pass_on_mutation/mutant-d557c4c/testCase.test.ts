const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

describe("pull stream with non-object argument", () => {
  it("should handle non-object arguments correctly", (done) => {
    const testString = "test";
    let callCount = 0;

    pull(
      values([1, 2, 3]),
      (read: any) => {
        return (end: any, cb: any) => {
          read(end, (err: any, data: any) => {
            if (err) return cb(err);
            if (data === undefined) return cb(true);
            callCount++;
            // Return a string (not an object) to test the condition
            cb(null, testString);
          });
        };
      },
      collect((err: any, collected: any) => {
        try {
          expect(err).toBeNull();
          // In original code, strings should pass through unchanged
          // In mutated code, strings would trigger the object branch
          expect(collected).toEqual([testString, testString, testString]);
          expect(callCount).toBe(3);
          done();
        } catch (e) {
          done(e);
        }
      })
    );
  });
});