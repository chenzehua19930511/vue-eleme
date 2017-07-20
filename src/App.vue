<template>
  <div id="app">
    <v-header :seller="seller" ref='aaa'></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" ></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "./components/header/header";
  import {urlParse} from "./common/js/util.js";
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }

    },
    created() {
      this.$http.get(`/api/seller?id=${this.seller.id}`).then((res) => {
        if (res.body.errno == 0) {
          this.seller = Object.assign({}, this.seller, res.body.data);
          console.log(this.seller.id);
        }
      })
    },
    components: {"v-header": header}
  }
</script>

<style lang="less">
  @import "./common/less/mixin.less";

  #app {
    > .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      .border1px(rgba(7, 17, 27, 0.1));
      > .tab-item {
        flex: 1;
        text-align: center;
        > a {
          display: block;
          font-size: 14px;
          color: rgb(77, 85, 93);
        }
        a.active {
          color: rgb(240, 20, 20);
        }
      }
    }

  }

</style>
