import {
    TEST_ACTION
} from './mutation-types.js'

export default {
    async countAnother({
                           commit,
                           state
                       }) {
        setTimeout(() => {
            commit(TEST_ACTION, 100)
        }, 1000);
    }
}
