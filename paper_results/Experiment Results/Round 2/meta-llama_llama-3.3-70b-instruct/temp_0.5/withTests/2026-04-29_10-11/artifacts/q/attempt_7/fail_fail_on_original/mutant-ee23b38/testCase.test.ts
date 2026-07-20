import { Q } from "../../../../../q";

describe('Promise', () => {
    it('should call the set method on an object and return undefined on the original code', () => {
        const obj = { set: (key, value) => { obj[key] = value; } };
        const promise = Q(obj).set('a', 1);
        return promise.then((result) => {
            expect(result).toBeUndefined();
            expect(obj.a).toBe(1);
        });
    });
});