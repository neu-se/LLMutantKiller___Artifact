import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should return a promise with a state of "unknown" when inspect is not provided', () => {
        const promise = Q.Promise({}, function() {}, function() { return { state: "unknown" }; });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});