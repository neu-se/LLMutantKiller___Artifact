import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should read values from array when not aborting", (done) => {
    const source = values([1, 2, 3]);
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(1);
      done();
    });
  });
});