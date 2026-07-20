const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise when pending and not fall through to return inspected value", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Mock inspect to return a fulfilled state with a specific value
    const mockInspect = { state: "fulfilled", value: "MOCK_VALUE" };
    promise.inspect = jest.fn().mockReturnValue(mockInspect);

    const result = promise.valueOf();

    // In original code: should return the promise (not fall through)
    // In mutated code: would return "MOCK_VALUE" due to inverted condition
    expect(result).toBe(promise);
    expect(result).not.toBe("MOCK_VALUE");
    expect(promise.inspect).toHaveBeenCalled();
  });
});