import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should have a default inspect function when none is provided', () => {
        const promise = Q.Promise({}, function fallback() {
            return this;
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});