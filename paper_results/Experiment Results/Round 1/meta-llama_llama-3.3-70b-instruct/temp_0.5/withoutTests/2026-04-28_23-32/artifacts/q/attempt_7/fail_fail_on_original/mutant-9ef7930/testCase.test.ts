import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should pass on the original code and fail on the mutated code', () => {
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