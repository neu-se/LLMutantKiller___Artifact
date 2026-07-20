import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object argument", () => {
  it("should handle object arguments correctly", (done) => {
    const testObject = { value: 42 };
    const results: any[] = [];

    pull(
      pull.values([1, 2, 3]),
      (read: any) => {
        return (end: any, cb: any) => {
          read(end, (err: any, data: any) => {
            if (err) return cb(err);
            if (data === undefined) return cb(true);
            results.push(data);
            cb(null, testObject);
          });
        };
      },
      pull.collect((err: any, collected: any) => {
        try {
          expect(err).toBeNull();
          expect(collected).toEqual([testObject, testObject, testObject]);
          done();
        } catch (e) {
          done(e);
        }
      })
    );
  });
});