import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.isFulfilled', () => {
    it('should return true for a non-promise value', () => {
        expect(Q.isFulfilled(1)).toBe(true);
        expect(Q.isFulfilled(Q(1))).toBe(true);
    });
});