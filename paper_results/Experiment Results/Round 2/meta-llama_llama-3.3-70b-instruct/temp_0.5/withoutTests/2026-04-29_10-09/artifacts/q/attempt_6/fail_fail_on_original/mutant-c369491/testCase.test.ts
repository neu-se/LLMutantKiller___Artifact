import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when then method is called with an empty string as the operation', () => {
        const promise = Q(42);
        expect(() => {
            promise.then(void 0, void 0, void 0);
            promise.promiseDispatch(void 0, "", [void 0, () => {}]);
        }).toThrowError();
    });
});