import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should test the mutation', () => {
        const promise1 = q.resolve(1);
        const promise2 = q.resolve(2);
        const promise3 = q.reject('Error');

        return q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values.length).toBe(3); // This should fail on the original code and the mutated code should pass
        }).catch((reason: any) => {
            expect(true).toBe(false); // This should not be reached on the mutated code
        });
    });
});