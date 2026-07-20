import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when post is called with an empty string', () => {
        expect(() => Q({}).post("", [])).toThrowError();
    });
});