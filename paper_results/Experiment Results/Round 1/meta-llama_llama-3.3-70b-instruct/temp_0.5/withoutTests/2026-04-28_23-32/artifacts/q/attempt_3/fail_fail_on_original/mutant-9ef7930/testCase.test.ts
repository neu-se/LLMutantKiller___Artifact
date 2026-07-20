import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should throw an error when the loop exceeds the array length', () => {
        const array = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
        const originalLength = array.length;
        const originalCode = () => {
            for (let i = 0; i < originalLength; i++) {
                Q.race([array[i]]);
            }
        };
        const mutatedCode = () => {
            for (let i = 0; i <= originalLength; i++) {
                Q.race([array[i]]);
            }
        };

        expect(() => originalCode()).not.toThrow();
        expect(() => mutatedCode()).toThrow();
    });
});