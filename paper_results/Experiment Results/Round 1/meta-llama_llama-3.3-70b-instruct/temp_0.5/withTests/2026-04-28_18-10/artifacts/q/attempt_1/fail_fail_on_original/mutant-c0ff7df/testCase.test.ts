import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when get is called with an empty string', () => {
        const object = { foo: 'bar' };
        expect(() => Q(object).dispatch("", [])).toThrowError();
    });
});