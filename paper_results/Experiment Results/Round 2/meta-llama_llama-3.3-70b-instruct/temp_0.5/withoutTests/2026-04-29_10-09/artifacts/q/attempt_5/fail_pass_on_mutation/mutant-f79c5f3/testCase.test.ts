import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should test the mutation', () => {
        const promise1 = q.resolve(1);
        const promise2 = q.resolve(2);
        const promise3 = q.resolve(3);
        const promise4 = q.reject('Error');

        return q.all([promise1, promise2, promise3, promise4]).then(() => {
            expect(true).toBe(false); // This should not be reached on the original code
        }).catch((reason: any) => {
            expect(reason).toBe('Error');
        });
    });
});