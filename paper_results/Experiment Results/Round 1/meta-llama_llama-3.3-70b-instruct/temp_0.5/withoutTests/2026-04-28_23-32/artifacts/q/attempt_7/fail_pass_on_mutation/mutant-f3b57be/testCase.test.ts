import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array reduce correctly', async () => {
        const array = [1, 2, 3];
        const callback = (a: number, b: number) => a + b;
        const result = array.reduce(callback, 0);
        expect(result).toBe(6);
    });

    it('should return the initial value when reduce is called with an empty array', async () => {
        const array: number[] = [];
        const callback = (a: number, b: number) => a + b;
        const result = array.reduce(callback, 0);
        expect(result).toBe(0);
    });

    it.skip('should throw an error when reduce is called with no initial value on a non-empty array', async () => {
        const array = [1, 2, 3];
        const callback = (a: number, b: number) => a + b;
        expect(() => array.reduce(callback)).toThrow(TypeError);
    });

    it('should throw an error when reduce is called with no initial value on an empty array', async () => {
        const array: number[] = [];
        const callback = (a: number, b: number) => a + b;
        expect(() => array.reduce(callback)).toThrow(TypeError);
    });
});