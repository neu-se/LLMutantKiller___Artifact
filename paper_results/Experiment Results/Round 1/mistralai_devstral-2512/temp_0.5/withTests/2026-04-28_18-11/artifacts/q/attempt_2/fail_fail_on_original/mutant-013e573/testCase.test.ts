import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.npost behavior with undefined args", () => {
  it("should handle undefined args correctly", async () => {
    const obj = {
      method: function (a: any, b: any, callback: (err: any, result?: any) => void) {
        callback(null, a + b);
      }
    };

    // Test with undefined args - should work without adding extra elements
    const result = await Q.npost(obj, "method", [undefined, undefined]);

    // The mutation would add "Stryker was here" to the args array
    // which would cause the method to receive unexpected arguments
    expect(result).toBe(0); // undefined + undefined = NaN, but we expect the original behavior
  });
});