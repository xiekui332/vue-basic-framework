const city = {
    state: {
        cityData: {
            msg: '---'
        }
    },
    actions: {
        updateCityData ({commit}, params) {
            commit('UPDATE_CITY_DATA', params);
        }
    },
    mutations: {
        UPDATE_CITY_DATA (state, data) {
            state.cityData = data;
        }
    }
};

export default city;
