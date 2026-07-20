// testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should dispatch with the correct operation name", async () => {
    const obj = { a: 1 };
    const result = await Q(obj).get("a");
    expect(result).toBe(1);
  });
});