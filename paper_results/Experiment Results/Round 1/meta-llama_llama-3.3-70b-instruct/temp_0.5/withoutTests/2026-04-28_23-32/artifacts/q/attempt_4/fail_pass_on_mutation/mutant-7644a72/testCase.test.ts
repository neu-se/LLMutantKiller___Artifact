import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when trying to use QReturnValue in the mutated code', () => {
        try {
            new QReturnValue('test');
            expect(true).toBe(false);
        } catch (error) {
            expect(true).toBe(true);
        }
    });
});