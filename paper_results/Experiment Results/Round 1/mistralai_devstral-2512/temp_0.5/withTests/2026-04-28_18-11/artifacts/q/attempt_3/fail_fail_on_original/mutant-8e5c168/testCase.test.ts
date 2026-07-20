import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise constructor", () => {
  it("should create a promise that can be resolved", () => {
    return new Q.Promise((resolve: any) => {
      resolve("success");
    }).then((result: any) => {
      expect(result).toBe("success");
    });
  });
});