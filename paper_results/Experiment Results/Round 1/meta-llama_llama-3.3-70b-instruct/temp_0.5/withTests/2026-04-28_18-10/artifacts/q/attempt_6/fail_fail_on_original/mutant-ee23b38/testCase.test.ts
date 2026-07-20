import { Q } from '../../../q.js';

describe('Promise', () => {
    it('should call the set method on an object and return undefined', () => {
        const obj = { a: 1 };
        const promise = Q(obj).set('a', 2);
        return promise.then((result: any) => {
            expect(result).toBeUndefined();
            expect(obj.a).toBe(2);
        });
    });
});