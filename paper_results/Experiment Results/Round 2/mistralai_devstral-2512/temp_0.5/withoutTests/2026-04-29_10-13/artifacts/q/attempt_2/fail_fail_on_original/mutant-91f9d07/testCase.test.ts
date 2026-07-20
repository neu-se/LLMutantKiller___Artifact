import { denodeify } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
  it("should handle undefined callback by returning a function", () => {
    const result = denodeify(undefined);
    expect(typeof result).toBe("function");
  });
});