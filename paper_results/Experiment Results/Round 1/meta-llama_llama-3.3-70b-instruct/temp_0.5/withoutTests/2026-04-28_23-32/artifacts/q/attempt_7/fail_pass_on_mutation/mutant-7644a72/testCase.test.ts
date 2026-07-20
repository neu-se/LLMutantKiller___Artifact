import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should define QReturnValue inside Q', () => {
        const q = Q(function(resolve, reject) {
            try {
                throw new Error();
            } catch (e) {
                resolve(e);
            }
        });
        expect(q.then).toBeDefined();
        q.then((value) => {
            try {
                throw new QReturnValue();
            } catch (e) {
                expect(e.constructor.name).toBe('QReturnValue');
            }
        });
    });
});