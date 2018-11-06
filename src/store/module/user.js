import {
  SET_OPENID,
  SET_NICKNAME,
  SET_HEAD_IMG_URL,
  SET_TELEPHONE,
  SET_UNION_ID,
  SET_SUBSCRIBE
} from '../mutation-types';
const state = {
  telephone: '',
  openId: '',
  unionId: '',
  nickname: '',
  headImgUrl: '',
  hadSubscribed: false
};
const actions = {
  setUserSubscribe({ commit }, hadSubscribed) {
    commit(SET_SUBSCRIBE, hadSubscribed);
  },
  setTelephoneNumber({ commit }, telephone) {
    commit(SET_TELEPHONE, telephone);
  },
  setOpenId({commit}, openId) {
    commit(SET_OPENID, openId);
  },
  setUnionId({commit}, unionId) {
    commit(SET_UNION_ID, unionId);
  },
  setNickname({commit}, name) {
    commit(SET_NICKNAME, name);
  },
  setHeadImgUrl({commit}, imgUrl) {
    commit(SET_HEAD_IMG_URL, imgUrl);
  }
};
const mutations = {
  [SET_SUBSCRIBE](state, data) {
    state.hadSubscribed = data;
  },
  [SET_TELEPHONE](state, data) {
    state.telephoneNumber = data;
    localStorage.setItem('userTelephoneNumber', data);
  },
  [SET_OPENID](state, id) {
    state.openId = id;
    id && localStorage.setItem('userOpenId', id);
  },
  [SET_UNION_ID](state, id) {
    state.unionId = id;
    id && localStorage.setItem('userUnionId', id);
  },
  [SET_NICKNAME](state, name) {
    state.nickname = name;
    name != null && localStorage.setItem('userNickname', name);
  },
  [SET_HEAD_IMG_URL](state, img) {
    state.headImgUrl = img;
    img && localStorage.setItem('userHeadImgUrl', img);
  }
};
const getters = {
  telephone: state => state.telephoneNumber || localStorage.getItem('userTelephoneNumber'),
  openId: state => state.openId || localStorage.getItem('userOpenId'),
  unionId: state => state.unionId || localStorage.getItem('userUnionId'),
  nickname: state => state.nickname || localStorage.getItem('userNickname'),
  userHadSubscribed: state => state.hadSubscribed,
  headImgUrl: state => state.headImgUrl || localStorage.getItem('userHeadImgUrl')
};
export default {
  state,
  actions,
  mutations,
  getters
};
