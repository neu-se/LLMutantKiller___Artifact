import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values with null/undefined input", () => {
  it("should call cb with true (end) when null is passed and no abort", (done) => {
    const read = values(null, undefined);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});