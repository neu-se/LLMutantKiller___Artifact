// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-63e4667/testCase.test.ts
import { Q } from "./q.js";

describe("Q.keys() mutation test", () => {
  it("should call dispatch with correct arguments", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const dispatchSpy = jest.spyOn(promise, "dispatch");

    promise.keys();

    expect(dispatchSpy).toHaveBeenCalledWith("keys", []);
    dispatchSpy.mockRestore();
  });
});