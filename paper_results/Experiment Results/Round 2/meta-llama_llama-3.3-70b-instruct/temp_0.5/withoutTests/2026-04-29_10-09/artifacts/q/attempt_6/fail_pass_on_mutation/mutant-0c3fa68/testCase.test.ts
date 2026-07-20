import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should do something when progress function is called', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        q.progress();
        expect(consoleSpy).not.toHaveBeenCalled();
    });
});