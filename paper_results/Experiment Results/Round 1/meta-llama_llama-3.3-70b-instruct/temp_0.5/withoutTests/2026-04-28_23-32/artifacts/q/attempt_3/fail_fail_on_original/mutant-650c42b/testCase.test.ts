import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should dispatch a message to an object', () => {
        const result = Q.dispatch({}, 'op', ['arg1', 'arg2']);
        expect(result).toBeUndefined();
    });
});