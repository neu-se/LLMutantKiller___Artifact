import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator function", () => {
  it("should correctly handle generator return values", async () => {
    const result = await Q.async(function* () {
      return "test value";
    })();

    expect(result).toBe("test value");
  });
});