import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('Q["delete"] should throw an error when used without arguments on the mutated code', () => {
        expect(() => Q["delete"]()).toThrowError();
    });
});