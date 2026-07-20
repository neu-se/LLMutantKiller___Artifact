import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.get', () => {
    it('should dispatch "get" operation', () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        const result = Q.get(object, key);
        result.then((value) => {
            expect(value).toBe('bar');
        });
    });
});