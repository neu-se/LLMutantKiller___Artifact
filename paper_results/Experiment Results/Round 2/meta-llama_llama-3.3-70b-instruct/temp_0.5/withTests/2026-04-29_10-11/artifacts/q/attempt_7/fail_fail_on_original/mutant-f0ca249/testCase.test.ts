import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle array reduction correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const promise = Q(array);
        const result = promise.then((arr: number[]) => {
            if (arr.length === 0) {
                return 0;
            }
            return arr.reduce((acc: number, current: number) => acc + current, 0);
        });
        expect(result).resolves.toBe(15);
    });
});