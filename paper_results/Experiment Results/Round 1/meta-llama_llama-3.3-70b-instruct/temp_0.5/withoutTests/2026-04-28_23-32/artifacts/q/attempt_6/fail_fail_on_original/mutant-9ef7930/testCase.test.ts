import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should not throw an error when the original code is used', () => {
        const array = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
        const originalCode = () => {
            for (let i = 0; i < array.length; i++) {
                Q.race([array[i]]);
            }
        };

        expect(() => originalCode()).not.toThrow();
    });

    it('should throw an error when the mutated code is used', () => {
        const array = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
        const mutatedCode = () => {
            for (let i = 0; i <= array.length; i++) {
                Q.race([array[i]]);
            }
        };

        expect(() => mutatedCode()).toThrow();
    });
});