import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor with inspect function", () => {
  it("should use the provided inspect function when defined", () => {
    const customInspect = () => ({ state: "custom" });
    const promise = Q.makePromise({}, void 0, customInspect);
    expect(promise.inspect()).toEqual({ state: "custom" });
  });
});