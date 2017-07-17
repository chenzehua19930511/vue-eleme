<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import connect from "../connect/connect.js";
  export default {
    data() {
      return {}
    },
    props: {
      food: {
        type: Object
      }
    },
    created() {
//      console.log(this.food);
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        }
        else {
          this.food.count++;
        }
        this.$emit("cartAdd",event.target);
        connect.$emit("eventTarget",event.target)
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>
<style lang="less">
  .cartcontrol {
    font-size: 0;
    .cart-decrease, .cart-add {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      &.move-enter-active, &.move-leave-active {
        transition: all 0.5s linear;
      }
      &.move-enter-to, &.move-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0) rotate(0);
      }
      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0) rotate(180deg);
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add {

    }

  }
</style>
