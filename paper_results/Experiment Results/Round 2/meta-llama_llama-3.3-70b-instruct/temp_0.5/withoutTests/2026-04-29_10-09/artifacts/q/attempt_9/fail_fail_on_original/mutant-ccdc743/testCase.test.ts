import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not throw an error when finally callback is a function in the mutated code', () => {
        const callback = "string";
        expect(() => {
            Q().finally(callback);
        }).not.toThrowError();
    });
});