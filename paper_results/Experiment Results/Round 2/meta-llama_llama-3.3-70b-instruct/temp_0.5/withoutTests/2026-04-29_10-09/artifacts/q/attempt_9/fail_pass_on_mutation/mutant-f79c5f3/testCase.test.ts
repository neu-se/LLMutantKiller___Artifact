import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should test the mutation', () => {
        const promise1 = q.resolve(1);
        const promise2 = q.resolve(2);
        const promise3 = q.resolve(3);

        return q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values.length).toBe(3); // This should pass on the original code
        });
    });

    it('should test the mutation with rejection', () => {
        const promise1 = q.resolve(1);
        const promise2 = q.reject('Error');
        const promise3 = q.resolve(3);

        return q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(true).toBe(false); // This should not be reached on the original code
        }).catch((reason: any) => {
            expect(reason).toBe('Error'); // This should pass on the original code
        });
    });
});