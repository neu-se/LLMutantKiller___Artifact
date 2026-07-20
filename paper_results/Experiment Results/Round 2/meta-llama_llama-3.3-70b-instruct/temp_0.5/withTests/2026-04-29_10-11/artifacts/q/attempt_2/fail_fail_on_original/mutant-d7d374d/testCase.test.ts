import { deprecate } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('deprecate function', () => {
    it('should call the original function when deprecated function is called', () => {
        const originalFunction = jest.fn();
        const deprecatedFunction = deprecate(originalFunction, 'deprecatedFunction', 'newFunction');
        deprecatedFunction();
        expect(originalFunction).toHaveBeenCalledTimes(1);
    });
});