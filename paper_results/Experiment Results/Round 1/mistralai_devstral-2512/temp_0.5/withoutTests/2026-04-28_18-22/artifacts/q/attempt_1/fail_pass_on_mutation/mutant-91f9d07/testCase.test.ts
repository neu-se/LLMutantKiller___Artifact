import { denodeify } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("denodeify with undefined callback", () => {
  it("should throw an error when callback is undefined", () => {
    expect(() => {
      denodeify(undefined);
    }).toThrow();
  });
});