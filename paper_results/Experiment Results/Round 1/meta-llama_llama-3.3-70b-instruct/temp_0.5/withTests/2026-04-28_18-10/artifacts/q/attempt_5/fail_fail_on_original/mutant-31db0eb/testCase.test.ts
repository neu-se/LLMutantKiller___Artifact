import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should throw an error when nextTick is called with no arguments', () => {
        expect(() => Q.nextTick()).toThrowError();
    });
});