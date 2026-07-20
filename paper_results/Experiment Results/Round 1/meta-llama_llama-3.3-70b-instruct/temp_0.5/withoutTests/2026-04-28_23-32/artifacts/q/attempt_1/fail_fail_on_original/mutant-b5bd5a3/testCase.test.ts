import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should inspect a promise and return its state', () => {
        const promise = Q.resolve(1);
        const inspected = promise.inspect();
        expect(inspected.state).toBe('fulfilled');
        expect(inspected.value).toBe(1);
    });
});