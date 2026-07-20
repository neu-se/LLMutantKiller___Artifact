import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress notification", () => {
  it("should notify progress listeners with the transformed value", (done) => {
    const deferred = Q.defer();
    let notifiedValue: number | undefined;

    deferred.promise.then(
      undefined,
      undefined,
      (value: number) => {
        notifiedValue = value;
      }
    );

    // Trigger progress notification
    deferred.notify(42);

    // Give the nextTick a chance to execute
    setTimeout(() => {
      expect(notifiedValue).toBe(42);
      done();
    }, 10);
  });
});