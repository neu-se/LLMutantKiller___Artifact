import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator continuation", () => {
  it("should correctly handle generator with 'next' continuation", async () => {
    const result = await Q.async(function* () {
      const value = yield Q.resolve(42);
      return value;
    })();

    expect(result).toBe(42);
  });
});