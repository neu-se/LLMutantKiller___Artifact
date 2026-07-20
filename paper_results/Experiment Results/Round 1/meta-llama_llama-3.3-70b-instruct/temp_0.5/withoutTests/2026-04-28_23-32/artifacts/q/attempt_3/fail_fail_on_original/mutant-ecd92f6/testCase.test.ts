import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should return a promise with a state of "unknown" when inspect is not provided and fallback is called', () => {
        const promise = Q.Promise({}, function(op) {
            return {};
        }, undefined);
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});