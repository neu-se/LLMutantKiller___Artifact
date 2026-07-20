import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reduce an array correctly', () => {
        const array = [undefined, 2, 3, 4, 5];
        const promise = Q(array);
        return promise.then((arr: (number | undefined)[]) => {
            const sum = arr.filter(x => x !== undefined).reduce((acc: number, current: number) => acc + current, 0);
            expect(sum).toBe(14);
        });
    });
});