const home = {
    state: {
        homeData: {
            msg: '111'
        }
    },
    actions: {
        updateHomeData ({commit}, params) {
            commit('UPDATE_HOME_DATA', params);
        }
    },
    mutations: {
        UPDATE_HOME_DATA (state, data) {
            state.homeData = data;
        }
    }
};

export default home;
