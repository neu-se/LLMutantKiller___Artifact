import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when get is called with a valid key', () => {
        const object = { foo: 'bar' };
        expect(() => Q(object).get("foo")).not.toThrowError();
    });
});