import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join behavior", () => {
  it("should resolve when x and y are equal", async () => {
    const x = 42;
    const y = 42;
    const result = await Q.join(x, y);
    expect(result).toBeUndefined();
  });
});