import { Q } from "./q.js";

describe('Q Promise', () => {
    it('should resolve with the correct value when using all and then', () => {
        const promise = Q.all([Q(1), Q(2), Q(3)]);
        const result = promise.then((values: any[]) => {
            expect(values.length).toBe(3);
            return values.reduce((a: number, b: number) => a + b, 0);
        });
        return expect(result).resolves.toBe(6);
    });
});