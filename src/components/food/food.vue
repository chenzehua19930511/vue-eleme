<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="seller-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @cartAdd="cartAdd" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
                        :ratings="food.ratings" @ratingTypeSelect="ratingTypeSelect"
                        @contentToggle="contentToggle"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | timeFormat}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import cartcontrol from "../cartcontrol/cartcontrol.vue";
  import split from "../split/split.vue";
  import ratingselect from "../ratingselect/ratingselect.vue";
  import {formateDate} from "../../common/js/date.js";

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: "全部",
          positive: "推荐",
          negative: "吐槽"
        }
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.food, {
              click: true
            });
          }
          this.foodScroll.refresh();
        })
      },
      back() {
        this.showFlag = false;

      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }

        this.$set(this.food, "count", 1);
      },
      cartAdd(target) {
        this.$emit("cartAdd", target);
      },
      ratingTypeSelect(type){
        this.selectType = type;
        this.$nextTick(()=>{
          this.foodScroll.refresh();
        })
      },
      contentToggle(onlyContent){
        this.onlyContent = onlyContent;
        this.$nextTick(()=>{
          this.foodScroll.refresh();
        })
      },
      needShow(type, text){
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        }
        else {
          return type === this.selectType;
        }
      }
    },
    components: {
      cartcontrol, split, ratingselect
    },
    filters: {
      timeFormat(time) {
//        let timeFormat = new Date(time);
//        let year = timeFormat.getFullYear();
//        let month = timeFormat.getMonth() + 1 < 10 ? '0' + (timeFormat.getMonth() + 1) : timeFormat.getMonth() + 1;
//        let date = timeFormat.getDate() < 10 ? '0' + timeFormat.getDate() : timeFormat.getDate();
//        return `${year}-${month}-${date}`;
        let date = new Date(time);
        return formateDate(date,'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/less/mixin.less";

  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s linear;
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
        .seller-count, .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .seller-count {
          margin-right: 12px;
        }
      }
      .price {
        font-weight: 700;
        line-height: 24px;
        .now {
          margin-right: 18px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background-color: rgb(0, 160, 220);
      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.5s;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          .border1px(rgba(7, 17, 27, 0.1));
          .user {
            position: absolute;
            top: 16px;
            right: 0;
            line-height: 12px;
            font-size: 0;
            .name {
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            color: rgb(147, 153, 159);
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            .icon-thumb_up, .icon-thumb_down {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
              color: rgb(147, 153, 159);
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
          }
        }
        .no-rating{
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147,153,159);
        }
      }
    }
  }

</style>
