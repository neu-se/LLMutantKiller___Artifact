import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should define QReturnValue when using async', () => {
        function* generator() {
            try {
                throw new Error();
            } catch (e) {
                expect(e instanceof QReturnValue).toBe(false);
                throw e;
            }
        }
        const q = Q(Q.async(generator));
        q.catch((error) => {
            expect(error instanceof Error).toBe(true);
        });
    });
});