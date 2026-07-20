import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should create a promise with a state of "unknown" when no inspect function is provided', () => {
        const promise = Q.Promise({}, function () {}, function () { return { state: "unknown" }; });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});