import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should throw an error when inspect function is not provided and fallback function is called', () => {
        const promise = Q.Promise({}, function() {
            return {};
        });
        expect(() => promise.inspect()).toThrowError();
    });
});