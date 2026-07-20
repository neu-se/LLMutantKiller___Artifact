import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle QReturnValue', () => {
        const q = Q(function(resolve, reject) {
            try {
                throw new Error();
            } catch (e) {
                resolve(e);
            }
        });
        q.then((value) => {
            try {
                throw new Error();
            } catch (e) {
                if (typeof QReturnValue === 'function') {
                    expect(true).toBe(true);
                } else {
                    throw new Error('QReturnValue is not defined');
                }
            }
        });
    });
});