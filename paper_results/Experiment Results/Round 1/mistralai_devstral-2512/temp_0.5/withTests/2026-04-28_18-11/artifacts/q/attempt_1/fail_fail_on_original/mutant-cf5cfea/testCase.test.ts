import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("coerce function exception handling", () => {
  it("should reject the deferred promise when an exception occurs during thenable assimilation", async () => {
    const thenable = {
      then: function () {
        throw new Error("Test exception");
      }
    };

    const promise = Q(thenable);
    await expect(promise).rejects.toThrow("Test exception");
  });
});