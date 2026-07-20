import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values with null/undefined input", () => {
  it("should call cb(true) when array is null/falsy and abort is not set", (done) => {
    const read = values(null, undefined);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});