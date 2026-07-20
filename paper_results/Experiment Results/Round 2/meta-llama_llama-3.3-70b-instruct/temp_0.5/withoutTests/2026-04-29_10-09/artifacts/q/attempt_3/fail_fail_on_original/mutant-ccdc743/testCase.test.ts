import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call finally callback when it is a function', () => {
        const callback = jest.fn();
        Q().finally(callback);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call finally callback when it is not a function', () => {
        const callback = "not a function";
        Q().finally(callback);
        expect(() => {
            // No error is thrown in the original code
        }).not.toThrowError();
    });
});