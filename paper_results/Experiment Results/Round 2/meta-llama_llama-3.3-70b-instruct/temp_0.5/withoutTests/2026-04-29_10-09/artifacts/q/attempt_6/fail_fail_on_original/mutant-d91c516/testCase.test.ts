import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when Q.keys is called with no arguments', () => {
        expect(() => Q.keys()).toThrowError();
    });
});