import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a stack trace when Q.longStackSupport is true', () => {
        Q.longStackSupport = true;
        const promise = Q.defer();
        const error = new Error();
        promise.reject(error);
        expect(error.stack).toContain('q.js');
    });
});