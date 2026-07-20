import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return a promise with a state of "unknown" when an inspect function is provided in the original code', () => {
        const promise = Q.Promise({}, function () {}, function () { return { state: "unknown" }; });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
    it('should throw an error when inspect is called on a promise with no inspect function in the mutated code', () => {
        const promise = Q.Promise({}, function () {}, undefined);
        expect(promise.inspect()).toThrowError();
    });
});