import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the correct value when get is called with a valid key', () => {
        const object = { foo: 'bar' };
        return Q(object).get("foo").then(value => {
            expect(value).toBe('bar');
        });
    });
});