import Vue from 'vue';

// 存session
export function setSession(key, val) {
    console.log(key)
  try {
    sessionStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    // empty
  }
}

// 取session
export function getSession(key) {
  let val = '';
  try {
    val = JSON.parse(sessionStorage.getItem(key)) || '';
  } catch (e) {
    // empty
  }
  return val;
}

Vue.prototype.$setSession = setSession;
Vue.prototype.$getSession = getSession;
