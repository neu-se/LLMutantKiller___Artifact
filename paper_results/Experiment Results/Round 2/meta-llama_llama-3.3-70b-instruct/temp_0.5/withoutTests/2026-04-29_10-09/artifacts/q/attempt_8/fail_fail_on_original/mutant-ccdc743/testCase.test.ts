import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when finally callback is not a function', () => {
        const callback = function () {};
        expect(() => {
            Q().finally(callback);
        }).toThrowError("Q can't apply finally callback");
    });
});