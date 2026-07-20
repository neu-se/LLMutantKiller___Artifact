import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise prototype', () => {
    it('should throw an error when trying to delete a property with an empty string', () => {
        const promise = Q({});
        expect(() => promise['']('a')).toThrowError();
    });
});