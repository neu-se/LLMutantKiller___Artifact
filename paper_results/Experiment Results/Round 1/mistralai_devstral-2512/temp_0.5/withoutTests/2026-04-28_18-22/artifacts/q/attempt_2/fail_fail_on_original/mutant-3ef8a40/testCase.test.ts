import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join behavior", () => {
  it("should resolve when two identical values are joined", () => {
    const promise = Q.join(42, 42);
    return expect(promise).resolves.toBeUndefined();
  });
});