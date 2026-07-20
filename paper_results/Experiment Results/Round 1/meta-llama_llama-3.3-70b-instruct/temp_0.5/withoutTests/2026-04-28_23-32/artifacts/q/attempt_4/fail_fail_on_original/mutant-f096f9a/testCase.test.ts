import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should throw an error when Q.any is an empty function', () => {
        const originalAny = Q.any;
        Q.any = function() {};
        expect(() => Q.any([])).toThrowError();
        Q.any = originalAny;
    });
});