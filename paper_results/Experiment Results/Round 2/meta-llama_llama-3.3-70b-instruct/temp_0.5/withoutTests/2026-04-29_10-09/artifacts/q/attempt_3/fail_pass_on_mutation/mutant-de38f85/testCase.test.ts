import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return keys of an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = q(obj);
        return promise.then((value) => {
            return q.keys(value).then((keys) => {
                expect(keys).toEqual(['a', 'b', 'c']);
            });
        });
    });
});