import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when trying to get the stack of a non-error object', () => {
        // Act and Assert
        expect(() => {
            try {
            } catch (e) {
                Q.hasStacks = !!e.stack;
            }
        }).toThrowError('Cannot read properties of undefined (reading \'stack\')');
    });
});