import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise inspection", () => {
  it("should correctly report pending state before resolution", () => {
    const deferred = defer();
    const promise = deferred.promise;

    // The mutation changes the condition from `if (messages)` to `if (true)`
    // which would make messages undefined immediately
    const inspection = promise.inspect();

    // For pending promises, state should be "pending"
    expect(inspection.state).toBe("pending");

    // Resolve and check state changes
    deferred.resolve("test");
    setTimeout(() => {
      const newInspection = promise.inspect();
      expect(newInspection.state).toBe("fulfilled");
      expect(newInspection.value).toBe("test");
    }, 10);
  });
});