import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should correctly set __minimumStackCounter__ property on error", () => {
    Q.longStackSupport = true;
    const error = new Error("test error");
    const promise = Q.reject(error);
    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err) => {
        expect(err).toBe(error);
        // Check if the __minimumStackCounter__ property is configurable
        const descriptor = Object.getOwnPropertyDescriptor(err, "__minimumStackCounter__");
        expect(descriptor).toBeDefined();
        expect(descriptor?.configurable).toBe(true);
        return Q.resolve();
      }
    ).finally(() => {
      Q.longStackSupport = false;
    });
  });
});