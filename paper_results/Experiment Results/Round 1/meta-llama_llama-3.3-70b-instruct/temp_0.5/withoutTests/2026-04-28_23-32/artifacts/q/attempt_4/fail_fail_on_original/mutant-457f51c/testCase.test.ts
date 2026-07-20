import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should not set exception property when state is fulfilled', () => {
        const promise = Q.resolve('Test Value');
        const inspected = promise.inspect();
        expect(inspected.exception).toBeUndefined();
    });
});