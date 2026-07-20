import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should return keys of an object as an array', () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).keys().then((keys) => {
            expect(keys).toEqual(['a', 'b']);
        });
    });
});