import { promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise function", () => {
  it("should create a promise that can be resolved", () => {
    return promise((resolve: any) => {
      resolve("success");
    }).then((result: any) => {
      expect(result).toBe("success");
    });
  });
});