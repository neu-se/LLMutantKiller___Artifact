import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the correct keys for an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const promise = Q(object).keys();
        return promise.then((keys: string[]) => {
            expect(keys).toEqual(Object.keys(object));
        });
    });
});