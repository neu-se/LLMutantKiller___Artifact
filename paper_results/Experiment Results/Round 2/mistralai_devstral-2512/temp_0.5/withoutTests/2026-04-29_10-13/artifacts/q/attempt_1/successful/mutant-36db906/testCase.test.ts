import { denodeify } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("denodeify mutation test", () => {
  it("should handle undefined callback by throwing an error", () => {
    expect(() => {
      denodeify(undefined);
    }).toThrow("Q can't wrap an undefined function");
  });
});