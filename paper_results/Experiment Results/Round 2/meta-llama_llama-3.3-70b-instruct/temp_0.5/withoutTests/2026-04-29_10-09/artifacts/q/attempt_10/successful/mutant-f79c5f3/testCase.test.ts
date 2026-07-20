import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should test the mutation', () => {
        const promise1 = q.resolve(1);
        const promise2 = q.resolve(2);
        const promise3 = q.resolve(3);

        return q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]); // This should pass on the original code
            expect(promise1.isPending()).toBe(false); // This should pass on the original code and fail on the mutated code
        });
    });
});