import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('Q["delete"] should throw an error when used without arguments', () => {
        var object = {a: 1};
        expect(() => Q["delete"](object)).toThrowError();
    });
});