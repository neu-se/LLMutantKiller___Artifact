import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should throw an error when Q["delete"] is called with no implementation', () => {
        const obj = { foo: 'bar' };
        const originalDelete = Q["delete"];
        Q["delete"] = function (object, key) {};
        expect(() => Q["delete"](obj, 'foo')).not.toThrow();
        Q["delete"] = originalDelete;
        expect(() => Q["delete"](obj, 'foo')).not.toThrow();
    });
});