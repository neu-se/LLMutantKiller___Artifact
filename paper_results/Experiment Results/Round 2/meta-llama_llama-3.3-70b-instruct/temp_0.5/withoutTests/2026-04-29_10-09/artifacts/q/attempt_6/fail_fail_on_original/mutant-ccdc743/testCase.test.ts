import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when finally callback is a string', () => {
        expect(() => {
            Q().finally("string");
        }).toThrowError("Q can't apply finally callback");
    });
});