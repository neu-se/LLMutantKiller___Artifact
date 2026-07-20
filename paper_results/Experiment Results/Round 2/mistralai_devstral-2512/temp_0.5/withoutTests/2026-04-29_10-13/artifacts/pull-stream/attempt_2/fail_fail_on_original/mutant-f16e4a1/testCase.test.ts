import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink behavior with immediate end", () => {
  it("should handle immediate end with true correctly", (done) => {
    const reducer = (acc: any, data: any) => data;
    const source = (end: any, cb: (end: any, data: any) => void) => {
      cb(true, null);
    };

    reduce(reducer, (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBeNull();
      done();
    })(source);
  });
});