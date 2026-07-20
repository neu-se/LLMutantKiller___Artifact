import { Q } from "./q";

describe('Q Promise', () => {
    it('should resolve with the correct value when using all', () => {
        const promise = Q.all([Q(1), Q(2), Q(3)]);
        const result = promise.then((values: any[]) => values.reduce((a: number, b: number) => a + b, 0));
        return result.then((value: any) => {
            expect(value).toBe(6);
        });
    });
});