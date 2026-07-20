import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when QReturnValue is not defined', () => {
        function* generator() {
            try {
                throw new Error();
            } catch (e) {
                throw e;
            }
        }
        const q = Q(Q.async(generator));
        q.catch((error) => {
            if (typeof QReturnValue !== 'undefined') {
                expect(true).toBe(true);
            } else {
                expect(true).toBe(false);
            }
        });
    });
});