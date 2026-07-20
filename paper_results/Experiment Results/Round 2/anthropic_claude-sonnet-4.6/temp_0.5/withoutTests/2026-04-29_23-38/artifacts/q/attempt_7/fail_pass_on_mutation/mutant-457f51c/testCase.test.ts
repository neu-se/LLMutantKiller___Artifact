import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nearer via valueOf", () => {
  it("valueOf on resolved deferred returns the fulfillment value", () => {
    const deferred = Q.defer();
    deferred.resolve(99);
    // After resolution, valueOf should eventually return nearer value
    const val = deferred.promise.valueOf();
    // The nearer value of a fulfilled promise is its value
    expect(val).toBe(99);
  });
});