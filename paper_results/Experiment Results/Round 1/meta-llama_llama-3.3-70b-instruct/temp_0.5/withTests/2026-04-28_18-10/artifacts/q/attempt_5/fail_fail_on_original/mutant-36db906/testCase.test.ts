import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.denodeify', () => {
    it('should return a function when given a valid callback', () => {
        const callback = (err: any, value: any) => {};
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe('function');
    });
});