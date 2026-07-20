import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when calling Q[""]', () => {
        expect(() => Q[""]).toThrow();
    });
});