import { Q } from "./q";

describe("Promise progress notification", () => {
  it("should notify progress listeners with transformed values", (done) => {
    const deferred = Q.defer();
    let notifiedValue: number | undefined;

    deferred.promise.then(
      undefined,
      undefined,
      (value: number) => {
        notifiedValue = value * 2;
        return notifiedValue;
      }
    ).then(
      () => {
        // This should not be called for progress notifications
        done(new Error("Promise should not fulfill during progress"));
      },
      undefined,
      (progress: number) => {
        // This is where we verify the progress notification
        expect(progress).toBe(42);
        done();
      }
    );

    // Trigger progress notification
    deferred.notify(21);
  });
});