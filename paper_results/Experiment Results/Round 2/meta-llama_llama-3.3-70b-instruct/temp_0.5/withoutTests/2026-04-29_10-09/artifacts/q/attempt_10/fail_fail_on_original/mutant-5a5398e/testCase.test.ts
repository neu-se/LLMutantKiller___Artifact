import { Q } from "../../q";

describe('Q', () => {
    it('should throw an error when trying to denodeify an undefined function', () => {
        expect(() => Q.denodeify(undefined)).toThrow();
    });
});