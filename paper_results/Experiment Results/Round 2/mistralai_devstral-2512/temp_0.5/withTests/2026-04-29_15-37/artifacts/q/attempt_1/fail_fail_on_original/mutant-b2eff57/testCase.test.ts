import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with an Error when all promises are rejected with null", () => {
    const deferreds = [Q.defer(), Q.defer()];
    const promises = [deferreds[0].promise, deferreds[1].promise];

    const resultPromise = Q.any(promises);

    deferreds[0].reject(null);
    deferreds[1].reject(null);

    return resultPromise.then(
      () => {
        throw new Error("Expected promise to be rejected");
      },
      (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Q can't get fulfillment value from any promise");
      }
    );
  });
});