import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should reject with an error when an empty array is passed', () => {
        return Q.race([]).then(() => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});