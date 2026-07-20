import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', () => {
    it('should fulfill with the first resolved promise', () => {
        const promises = [Q(1), Q(2), Q(3)];
        return Q.any(promises).then((value) => {
            expect(value).toBe(1);
        });
    });
});