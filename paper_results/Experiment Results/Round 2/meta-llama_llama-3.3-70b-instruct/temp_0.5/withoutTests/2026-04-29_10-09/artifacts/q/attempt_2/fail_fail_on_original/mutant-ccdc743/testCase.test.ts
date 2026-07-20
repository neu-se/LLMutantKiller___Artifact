import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not throw an error when finally callback is a function', () => {
        const callback = function () {};
        expect(() => {
            Q().finally(callback);
        }).not.toThrowError();
    });

    it('should throw an error when finally callback is not a function', () => {
        expect(() => {
            Q().finally("not a function");
        }).toThrowError("Q can't apply finally callback");
    });
});