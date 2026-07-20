import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should create a promise with a long stack trace when Q.longStackSupport is true', () => {
        Q.longStackSupport = true;
        const promise = Q.defer().promise;
        expect(promise.stack).toBeDefined();
    });
});