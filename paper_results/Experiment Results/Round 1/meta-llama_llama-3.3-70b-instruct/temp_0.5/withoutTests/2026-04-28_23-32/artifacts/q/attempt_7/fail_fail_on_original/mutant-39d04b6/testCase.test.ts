import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when inspect is called on a promise with no inspect function', () => {
        const promise = Q.Promise({}, function () {}, function () {});
        expect(() => promise.inspect()).toThrowError();
    });
});