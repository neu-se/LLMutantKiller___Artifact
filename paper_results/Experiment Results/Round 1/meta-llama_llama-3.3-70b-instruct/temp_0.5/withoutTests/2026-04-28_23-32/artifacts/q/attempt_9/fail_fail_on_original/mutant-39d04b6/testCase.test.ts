import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not throw an error when inspect is called on a promise with an inspect function', () => {
        const promise = Q.Promise({}, function () {}, function () { return { state: "unknown" }; });
        expect(() => promise.inspect()).not.toThrow();
    });
});