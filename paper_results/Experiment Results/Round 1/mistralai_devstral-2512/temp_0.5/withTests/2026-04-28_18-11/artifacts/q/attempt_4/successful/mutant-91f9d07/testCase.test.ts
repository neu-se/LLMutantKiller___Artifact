import { denodeify } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify behavior with defined callback", () => {
  it("should not throw an error when callback is defined", () => {
    // This test verifies that Q.denodeify works correctly when callback is defined
    // The mutation changes the condition from `if (callback === undefined)` to `if (true)`
    // which would cause the function to always throw an error even when callback is defined
    const testCallback = (arg: any, callback: any) => {
      callback(null, arg);
    };

    expect(() => {
      denodeify(testCallback);
    }).not.toThrow();
  });
});