import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('Q["delete"] should throw an error when used as a function', () => {
        expect(() => Q["delete"]()).toThrowError();
    });
});