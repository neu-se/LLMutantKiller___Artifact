import { Q } from "./q.js";

describe('Q', () => {
    it('should return the correct keys for an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const promise = Q(object).keys();
        return expect(promise).resolves.toEqual(Object.keys(object));
    });
});