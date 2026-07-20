import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object argument", () => {
  it("should handle object arguments correctly", (done) => {
    const testObject = { test: true };
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, "data");
    };

    const sink = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    };

    const pipeline = pull(
      source,
      sink,
      testObject,
      pull.collect((err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(["data"]);
        done();
      })
    );

    pipeline(null, () => {});
  });
});