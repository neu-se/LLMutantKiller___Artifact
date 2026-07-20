import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise prototype', () => {
    it('should throw an error when trying to call a method that does not exist', () => {
        const promise = Q({});
        expect(() => promise['nonExistingMethod']()).toThrowError();
    });

    it('should not throw an error when trying to call the "delete" method', () => {
        const promise = Q({});
        expect(() => promise['delete']()).not.toThrowError();
    });
});