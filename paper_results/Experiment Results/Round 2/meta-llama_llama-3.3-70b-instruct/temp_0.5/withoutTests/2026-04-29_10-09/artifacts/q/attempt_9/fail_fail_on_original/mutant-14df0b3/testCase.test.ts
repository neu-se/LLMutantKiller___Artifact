import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should not be empty when Q["delete"] is called', () => {
        const obj = { foo: 'bar' };
        const result = Q["delete"](obj, 'foo');
        expect(result).not.toBeUndefined();
    });
});