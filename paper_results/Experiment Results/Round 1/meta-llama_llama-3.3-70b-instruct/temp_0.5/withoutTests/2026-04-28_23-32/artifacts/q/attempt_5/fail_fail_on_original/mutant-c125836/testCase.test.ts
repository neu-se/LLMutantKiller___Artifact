import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reduce an array correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const promise = Q.Q(array);
        return promise.then((arr: number[]) => {
            const sum = arr.reduce((acc: number, current: number) => acc + current, 0);
            expect(sum).toBe(15);
        });
    });
});