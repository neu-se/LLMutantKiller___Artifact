import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call catch method without errors', () => {
        expect(() => Q.catch()).not.toThrow();
    });
});