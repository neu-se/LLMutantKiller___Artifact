import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when trying to denodeify an undefined function', () => {
        expect(() => Q.denodeify(undefined)).toThrow();
    });
});