import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support by default and should enable it when Q_DEBUG is set', () => {
        expect(Q.longStackSupport).toBe(false);

        process.env.Q_DEBUG = 'true';
        delete require.cache[require.resolve('../../../../../../../../subject_repositories/q/q.js')];
        const NewQ = require('../../../../../../../../subject_repositories/q/q.js');

        expect(NewQ.longStackSupport).toBe(true);

        delete process.env.Q_DEBUG;
    });
});