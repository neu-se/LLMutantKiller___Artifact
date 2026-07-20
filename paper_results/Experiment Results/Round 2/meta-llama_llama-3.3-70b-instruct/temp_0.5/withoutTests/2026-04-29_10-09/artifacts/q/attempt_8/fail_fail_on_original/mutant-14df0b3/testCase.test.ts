import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should throw an error when Q["delete"] does not call dispatch', () => {
        const obj = { foo: 'bar' };
        const originalDelete = Q["delete"];
        Q["delete"] = function (object, key) {};
        expect(() => Q["delete"](obj, 'foo')).toThrowError();
        Q["delete"] = originalDelete;
    });
});