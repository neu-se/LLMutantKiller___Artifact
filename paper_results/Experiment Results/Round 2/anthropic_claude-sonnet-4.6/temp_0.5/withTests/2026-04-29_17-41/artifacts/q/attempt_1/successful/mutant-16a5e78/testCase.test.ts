import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
    it("should return true for non-promise values like plain numbers", () => {
        // Original: !isPromise(object) || object.inspect().state === "fulfilled"
        // With ||, if object is not a promise, short-circuits to true immediately
        // Mutated: !isPromise(object) && object.inspect().state === "fulfilled"
        // With &&, if object is not a promise, tries to call object.inspect() which throws
        expect(Q.isFulfilled(42)).toBe(true);
    });
});