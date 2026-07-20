import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = q.all([q(arr)]).then((value) => {
            const index = value[0].indexOf(3);
            expect(index).toBe(2);
        });
    });
});