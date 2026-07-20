import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise inspection", () => {
  it("should correctly inspect a promise with a custom inspect function", () => {
    const customInspect = () => ({ state: "fulfilled", value: 42 });
    const promise = Q.makePromise({}, void 0, customInspect);
    const inspection = promise.inspect();
    expect(inspection).toEqual({ state: "fulfilled", value: 42 });
  });
});