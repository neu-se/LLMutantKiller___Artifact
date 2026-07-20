import { Q } from "./q.js";

describe('Q', () => {
    it('should return the correct keys for an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        return Q(object).keys().then((keys: string[]) => {
            expect(keys).toEqual(Object.keys(object));
        });
    });
});