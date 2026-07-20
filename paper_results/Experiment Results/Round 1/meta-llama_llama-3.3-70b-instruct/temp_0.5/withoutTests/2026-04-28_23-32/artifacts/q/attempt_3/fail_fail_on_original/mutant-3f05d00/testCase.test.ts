import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise library', () => {
    it('should have a finally method with the correct name', () => {
        const promise = Q.resolve();
        const methods = Object.getOwnPropertyNames(promise);
        expect(methods).toContain('finally');
    });
});