import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify", () => {
  it("should call nodeback with null error and value when promise resolves", (done) => {
    const resolvedValue = 42;
    const promise = Q.resolve(resolvedValue);

    const result = Q.nodeify(promise, function (err: Error | null, value: number) {
      expect(err).toBeNull();
      expect(value).toBe(resolvedValue);
      done();
    });

    // When nodeback is provided, nodeify should return undefined (not the promise)
    expect(result).toBeUndefined();
  });
});