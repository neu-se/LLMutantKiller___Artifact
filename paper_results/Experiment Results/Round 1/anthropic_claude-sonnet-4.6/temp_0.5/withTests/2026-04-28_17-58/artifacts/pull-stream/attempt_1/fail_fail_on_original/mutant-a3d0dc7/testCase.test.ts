import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values source - normal read without abort", () => {
  it("should return the first element when called with null abort", (done) => {
    const read = values([1, 2, 3], undefined);
    
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(1);
      done();
    });
  });
});