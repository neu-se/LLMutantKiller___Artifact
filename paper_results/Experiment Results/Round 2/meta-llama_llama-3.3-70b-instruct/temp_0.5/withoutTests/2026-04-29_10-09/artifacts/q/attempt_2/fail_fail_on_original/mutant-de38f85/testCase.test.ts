import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return keys of an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q(obj);
        return promise.then((value) => {
            return Q.keys(value).then((keys) => {
                expect(keys).toEqual(['a', 'b', 'c']);
            });
        });
    });
});