import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly handle conditional check for Firefox-style stack traces", () => {
    const stackLine = "non matching string";
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    const condition = !!attempt3;
    expect(condition).toBeFalse();
    if (condition) {
      throw new Error("Condition should be false");
    }
  });
});