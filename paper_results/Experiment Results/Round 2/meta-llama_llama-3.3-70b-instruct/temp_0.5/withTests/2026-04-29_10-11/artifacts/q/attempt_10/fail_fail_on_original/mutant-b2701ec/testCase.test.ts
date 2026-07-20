import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should create a promise with inspect method', () => {
        const promise = Q.defer().promise;
        expect(promise.inspect).toBeDefined();
        expect(typeof promise.inspect).toBe('function');
    });
});