import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q function', () => {
    it('should set the stack property on a promise when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const promise = Q.defer().promise;
        expect(promise.stack).toBeDefined();
    });
});