import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
  it("should call the callback with the resolved value and return the original value", async () => {
    const callbackValues: number[] = [];
    const result = await Q.tap(Q(42), (value: number) => {
      callbackValues.push(value);
    });
    expect(callbackValues).toEqual([42]);
    expect(result).toBe(42);
  });
});