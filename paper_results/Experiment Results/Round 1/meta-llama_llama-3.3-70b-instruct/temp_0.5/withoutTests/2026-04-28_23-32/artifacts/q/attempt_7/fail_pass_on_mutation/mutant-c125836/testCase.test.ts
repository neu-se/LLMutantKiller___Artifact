import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reduce an array correctly', () => {
        const array = new Array(1000).fill(undefined);
        array[500] = 10;
        const promise = Q(array);
        return promise.then((arr: (number | undefined)[]) => {
            const sum = arr.filter(x => x !== undefined).reduce((acc: number, current: number) => acc + current, 0);
            expect(sum).toBe(10);
        });
    });
});