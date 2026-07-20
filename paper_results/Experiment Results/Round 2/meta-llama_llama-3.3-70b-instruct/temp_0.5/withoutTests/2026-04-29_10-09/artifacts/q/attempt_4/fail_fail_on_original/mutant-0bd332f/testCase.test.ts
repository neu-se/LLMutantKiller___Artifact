import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array is sparse and reduce is called', () => {
        const sparseArray: (number | undefined)[] = [1, , 3];
        const promise = Q(sparseArray).then((array: (number | undefined)[]) => array.reduce((a: number, b: number) => a + b, 0));
        expect(promise).rejects.toThrow(TypeError);
    });
});