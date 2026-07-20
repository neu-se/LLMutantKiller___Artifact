import { denodeify } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify behavior with undefined callback", () => {
  it("should throw an error when callback is undefined", () => {
    // This test verifies that Q.denodeify throws an error when callback is undefined
    // The mutation changes the condition from `if (callback === undefined)` to `if (true)`
    // which would cause the function to always throw an error regardless of callback value
    expect(() => {
      denodeify(undefined);
    }).toThrow("Q can't wrap an undefined function");
  });
});