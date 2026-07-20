import { Q } from "../../../../../q";

describe('Q.denodeify', () => {
    it('should throw an error when callback is undefined', () => {
        expect(() => Q.denodeify(undefined)).toThrowError('Q can\'t wrap an undefined function');
    });
});