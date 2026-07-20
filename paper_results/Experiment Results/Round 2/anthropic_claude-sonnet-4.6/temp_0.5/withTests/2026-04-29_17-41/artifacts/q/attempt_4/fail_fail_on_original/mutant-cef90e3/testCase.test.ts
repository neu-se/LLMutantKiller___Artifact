import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("then - done flag prevents double resolution", () => {
  it("should only call fulfilled callback once when promise dispatches multiple times", () => {
    let callCount = 0;
    
    // Create a promise that dispatches its resolution callback twice
    const badPromise = Q.makePromise({
      "when": function(rejected: unknown, fulfilled: (v: unknown) => void) {
        fulfilled(1);
        fulfilled(2);
        return 1;
      }
    });

    return badPromise.then(function(value: unknown) {
      callCount++;
      return value;
    }).then(function(value: unknown) {
      expect(callCount).toBe(1);
      expect(value).toBe(1);
    });
  });
});