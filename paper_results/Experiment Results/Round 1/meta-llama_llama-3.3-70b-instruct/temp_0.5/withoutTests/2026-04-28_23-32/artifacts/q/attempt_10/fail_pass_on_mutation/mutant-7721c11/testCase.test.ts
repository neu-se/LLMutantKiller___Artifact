import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when array_indexOf is mutated', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = q(arr);
        const originalIndexOf = Array.prototype.indexOf;
        Array.prototype.indexOf = function() {
            return -1;
        };
        expect(() => promise.then((value) => {
            if (value.indexOf(3) !== 2) {
                throw new Error("indexOf is not working correctly");
            }
        })).rejects.toThrow();
        Array.prototype.indexOf = originalIndexOf;
    });
});