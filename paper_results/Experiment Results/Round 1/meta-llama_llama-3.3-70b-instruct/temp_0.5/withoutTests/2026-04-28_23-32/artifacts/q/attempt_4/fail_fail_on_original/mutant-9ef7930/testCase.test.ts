import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should resolve with the first fulfilled promise', () => {
        const promise1 = Q.delay(10);
        const promise2 = Q.delay(5);

        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBeUndefined();
        });
    });

    it('should throw an error when the loop exceeds the array length in the mutated code', () => {
        const array = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
        const originalCode = () => {
            for (let i = 0; i < array.length; i++) {
                Q.race([array[i]]);
            }
        };
        const mutatedCode = () => {
            for (let i = 0; i <= array.length; i++) {
                Q.race([array[i]]);
            }
        };

        expect(() => originalCode()).not.toThrow();
        expect(() => mutatedCode()).toThrow();
    });
});