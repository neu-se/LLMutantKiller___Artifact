import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise library', () => {
    it('should have a property named "finally" on a promise', () => {
        const promise = Q.resolve();
        const properties = Object.getOwnPropertyNames(promise);
        expect(properties).toContain("finally");
    });
});