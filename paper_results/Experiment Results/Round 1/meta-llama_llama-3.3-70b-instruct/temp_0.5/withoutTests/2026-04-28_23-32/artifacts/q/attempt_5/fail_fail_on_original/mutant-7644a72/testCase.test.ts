import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when QReturnValue is not defined', () => {
        try {
            Q(function(resolve, reject) {
                throw new Error();
            });
            expect(true).toBe(false);
        } catch (error) {
            if (error instanceof QReturnValue) {
                expect(true).toBe(false);
            } else {
                expect(true).toBe(true);
            }
        }
    });
});