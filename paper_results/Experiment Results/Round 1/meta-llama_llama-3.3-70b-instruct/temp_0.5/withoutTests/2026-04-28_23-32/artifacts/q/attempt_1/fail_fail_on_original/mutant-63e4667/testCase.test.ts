import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return an empty array when calling keys on an empty object', () => {
        const promise = Q({});
        const result = promise.keys();
        return result.then((keys) => {
            expect(keys).toEqual([]);
        });
    });
});