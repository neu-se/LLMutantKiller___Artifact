import { Q } from "./q";

describe('Q', () => {
    it('should throw an error with a specific message when trying to denodeify an undefined function', () => {
        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
    });
});