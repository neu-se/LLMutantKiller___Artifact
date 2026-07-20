import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify behavior with undefined callback", () => {
  it("should handle undefined callback gracefully", () => {
    // This test verifies that Q.denodeify handles undefined callback correctly
    // The mutation changes the condition from `if (callback === undefined)` to `if (true)`
    // which would cause the function to always throw an error when callback is undefined
    expect(() => {
      Q.denodeify(undefined);
    }).not.toThrow();
  });
});