import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should not be an empty function', () => {
        expect(Q.any).not.toBeInstanceOf(Function);
        expect(typeof Q.any).not.toBe('function');
    });
});