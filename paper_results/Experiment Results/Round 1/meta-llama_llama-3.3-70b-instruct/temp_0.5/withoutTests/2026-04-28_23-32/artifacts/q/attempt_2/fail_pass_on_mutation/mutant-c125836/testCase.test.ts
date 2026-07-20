import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reduce an array correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const initialValue = 10;
        const expectedSum = array.reduce((acc, current) => acc + current, initialValue);
        const promise = Q(array);
        return promise.then((arr) => {
            const sum = arr.reduce((acc: number, current: number) => acc + current, initialValue);
            expect(sum).toBe(expectedSum);
        });
    });
});