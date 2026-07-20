import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return undefined when get is called with a valid key', () => {
        const object = { foo: 'bar' };
        expect(Q(object).dispatch("get", ["foo"])).toBeUndefined();
    });
});