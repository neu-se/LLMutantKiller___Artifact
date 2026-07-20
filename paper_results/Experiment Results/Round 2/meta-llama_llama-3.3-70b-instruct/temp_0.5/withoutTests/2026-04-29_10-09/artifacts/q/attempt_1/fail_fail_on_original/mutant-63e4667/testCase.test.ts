import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return an empty array when getting keys of an object', () => {
        const object = {};
        const promise = Q(object).keys();
        return promise.then((keys) => {
            expect(keys).toEqual([]);
        });
    });
});