import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise library', () => {
    it('should have a finally method', () => {
        const promise = Q.resolve();
        expect(typeof promise.finally).toBe('function');
    });
});