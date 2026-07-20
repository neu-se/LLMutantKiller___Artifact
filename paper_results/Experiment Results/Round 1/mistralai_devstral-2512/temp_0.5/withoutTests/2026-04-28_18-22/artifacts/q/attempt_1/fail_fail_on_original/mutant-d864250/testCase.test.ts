// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-d864250/testCase.test.ts
import { Q } from "./q.js";

describe("Q.fulfill set operation", () => {
  it("should set property on fulfilled value", async () => {
    const obj = { existing: "value" };
    const promise = Q.fulfill(obj);
    await promise.set("newProp", "newValue");
    const result = await promise.get("newProp");
    expect(result).toBe("newValue");
  });
});