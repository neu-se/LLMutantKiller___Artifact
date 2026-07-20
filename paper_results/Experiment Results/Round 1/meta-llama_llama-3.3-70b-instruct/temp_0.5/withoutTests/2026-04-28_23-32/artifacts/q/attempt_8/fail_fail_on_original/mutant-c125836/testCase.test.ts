import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reduce an array correctly', () => {
        const array = [undefined, undefined, 3, 4, 5];
        const promise = Q(array);
        return promise.then((arr: (number | undefined)[]) => {
            const sum = arr.reduce((acc: number, current: number) => {
                if (current === undefined) {
                    throw new Error('Cannot reduce an array with undefined values');
                }
                return acc + current;
            }, 0);
            expect(sum).toBe(12);
        });
    });
});