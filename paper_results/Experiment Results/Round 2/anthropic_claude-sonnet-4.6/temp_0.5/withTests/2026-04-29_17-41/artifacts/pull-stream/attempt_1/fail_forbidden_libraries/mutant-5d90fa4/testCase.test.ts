import { describe, it, expect } from "@jest/globals";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values with null array", () => {
  it("should return a stream that immediately ends when called with null", (done) => {
    const read = values(null, undefined);
    
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});