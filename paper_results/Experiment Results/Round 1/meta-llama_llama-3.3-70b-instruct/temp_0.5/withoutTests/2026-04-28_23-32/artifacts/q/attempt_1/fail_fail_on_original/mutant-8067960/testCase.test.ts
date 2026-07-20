import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.get', () => {
    it('should dispatch a "get" operation', () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        const result = Q(object).dispatch("get", [key]);
        expect(result.then((value) => value)).resolves.toBe('bar');
    });
});