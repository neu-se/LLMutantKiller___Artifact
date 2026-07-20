import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should throw an error when inspect is not provided and fallback does not return a promise', () => {
        const promise = Q.Promise({}, function(op, args) {
            return {};
        });
        expect(() => promise.inspect()).toThrowError();
    });
});