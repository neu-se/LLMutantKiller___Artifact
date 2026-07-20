import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly handle promise rejection", () => {
    const promise = Q.reject("Test rejection");
    expect(promise.isRejected()).toBe(true);
  });
});