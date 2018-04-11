import {
    TEST_ACTION
} from './mutation-types.js'

export default {
    [TEST_ACTION](state, count) {
        if (count) {
            state.count = count;
            state.anotherIncrement = count;
        } else {
            ++state.count;
        }
    }
}
