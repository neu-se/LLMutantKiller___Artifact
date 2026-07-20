import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return a promise with a state of "unknown" when an inspect function is provided', () => {
        const promise = Q.Promise({}, function () {}, function () { return { state: "unknown" }; });
        expect(promise.inspect()).toEqual({ state: "unknown" });
        const promise2 = Q.Promise({}, function () {}, undefined);
        expect(promise2.inspect()).toEqual({ state: "unknown" });
    });
});