import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator support", () => {
  it("should handle ES6-style generator with return value", async () => {
    const result = await Q.async(function* () {
      const value = yield Q.resolve(42);
      return value * 2;
    })();

    expect(result).toBe(84);
  });
});