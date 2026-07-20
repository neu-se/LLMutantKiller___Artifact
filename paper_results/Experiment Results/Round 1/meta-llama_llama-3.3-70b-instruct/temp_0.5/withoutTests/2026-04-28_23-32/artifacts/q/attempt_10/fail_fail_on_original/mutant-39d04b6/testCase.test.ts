import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return a promise with a state when an inspect function is provided', () => {
        const promise = Q.Promise({}, function () {}, function () { return { state: "unknown" }; });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});