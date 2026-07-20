import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should not resolve a promise twice', () => {
        let resolved = false;
        const promise = Q.defer().promise;
        promise.then(() => {
            resolved = true;
        });
        promise.resolve();
        promise.resolve();
        expect(resolved).toBe(true);
    });
});