import { find, assign, method } from "lodash";
import util from "@/libs/util";
import router from "@/router";
import axios from "axios";
import $ from "jquery";
import CryptoJS from "@/utils/crypto";

const users = [
  { username: "admin", password: "admin", uuid: "admin-uuid", name: "Admin" },
  {
    username: "editor",
    password: "editor",
    uuid: "editor-uuid",
    name: "Editor"
  },
  { username: "user1", password: "user1", uuid: "user1-uuid", name: "User1" }
];

const toLogin = () => {
  util.cookies.remove("token");
  util.cookies.remove("uuid");
  router.push({ name: "login" });
};

export default ({
  service,
  request,
  serviceForMock,
  requestForMock,
  mock,
  faker,
  tools
}) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN(data = {}) {
    debugger;
    // 模拟数据
    mock.onAny("/login").reply(config => {
      //const user = find(users, tools.parse(config.data))
      var userInfo = null;
      var response222 = null;
      console.log(
        process.env.VUE_APP_Account + "...." + process.env.VUE_APP_PWD
      );
      var pwd = CryptoJS.encrypt(tools.parse(config.data).password);
      var apppwd = CryptoJS.encrypt(process.env.VUE_APP_PWD);

      return axios
        .post("/web/th3/authorizations", {
          accountName: process.env.VUE_APP_Account,
          password: apppwd
        })
        .then(function (response) {
          if (response.data.code == 0) {
            console.log("获取Token成功:" + response.data.data.token);
            response222 = response;

            var token = response.data.data.token;
            //TODO 调用用户信息接口
            return axios({
              url: "/web/th3/query/user/info",
              method: "post",
              headers: {
                token: token
              },
              data: {
                accountName: tools.parse(config.data).username,
                password: pwd
              }
            })
              .then(function (resUser) {
                if (resUser.data.code == 0) {
                  userInfo = resUser.data;
                 userInfo.data.token= response222.data.data.token;
                  //return tools.responseSuccess(assign({}, userInfo, { token: token })) //faker.random.uuid()
                } else {
                  //tools.responseError({}, '用户名不存在（请联系管理员），登录失败！')
                }


                if (resUser.data.code==0 && response222 != null && response222.data.code == 0) {
                  return tools.responseSuccess(
                    assign({}, userInfo, { token: response222.data.data.token })
                  ); //faker.random.uuid()
                } else {
                  return tools.responseError({}, "消息："+resUser.data.msg);
                }



              })
              .catch(function (error) {
                //console.log(error);
                // tools.responseError({}, '获取用户信息失败！'+ error);
              });
          } else {
            //tools.responseError({}, '用户名或密码错误，登录失败！')
          }
        })
        .catch(function (error) {
          //console.log(error);
          //tools.responseError({}, '获取登录信息失败！'+ error)
        });

      if (response222 != null && response222.data.code == 0) {
        return tools.responseSuccess(
          assign({}, userInfo, { token: response222.data.token })
        ); //faker.random.uuid()
      } else {
        return tools.responseError({}, "账号或密码不正确");
      }
    });

    return requestForMock({
      url: '/login',
      method: 'post',
      data
    })
  }
});
