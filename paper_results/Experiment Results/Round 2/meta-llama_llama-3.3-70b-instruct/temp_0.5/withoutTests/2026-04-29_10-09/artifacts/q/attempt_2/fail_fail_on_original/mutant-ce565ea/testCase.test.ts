import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a value when the promise is fulfilled', () => {
        const promise = Q(5);
        expect(promise.valueOf()).toBe(5);
    });
});