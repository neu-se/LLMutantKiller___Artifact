import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not throw an error when finally callback is null', () => {
        expect(() => {
            Q().finally(null);
        }).toThrowError("Q can't apply finally callback");
    });
});