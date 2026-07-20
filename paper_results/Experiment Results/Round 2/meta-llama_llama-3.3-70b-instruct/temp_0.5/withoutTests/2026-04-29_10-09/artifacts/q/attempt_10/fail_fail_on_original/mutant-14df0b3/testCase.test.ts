import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should return a promise when Q["delete"] is called', () => {
        const obj = { foo: 'bar' };
        const result = Q["delete"](obj, 'foo');
        expect(result).toBeInstanceOf(Promise);
    });
});