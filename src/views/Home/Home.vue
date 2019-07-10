<template>
  <section class="msite">
    <!--首页头部-->
      <Header :title="address.name || '正在定位中...'">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
        </span>
      </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories, index) in categoriesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in categories" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url"/>
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList/>
  </section>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper'
  import "swiper/dist/css/swiper.css"
  import Header from '../../components/Header/Header'
  import ShopList from '../../components/ShopList/ShopList'
  import { mapState } from 'vuex'

  export default {
    name: 'Home',
    components: {
      Header,
      ShopList
    },
    computed : {
      ...mapState({
        address: state => state.home.address,
        categories: state => state.home.categories
      }),

      categoriesArr () {
        const bigArr = []
        let smallArr = []
        const { categories } = this
        categories.forEach(c => {
          if (smallArr.length === 0) {
            bigArr.push(smallArr)
          }

          smallArr.push(c)
          if (smallArr.length === 8) {
            smallArr = []
          }
        })

        return bigArr
      }
    },
    async mounted () {
      //获取当前经纬度对应地址
      this.$store.dispatch('getAddress')
      //获取当前经纬度对应商家
      this.$store.dispatch('getShops')
      
      //获取食品分类列表
      /* 
      2.dispatch + callback
      this.$store.dispatch('getFoodCategories', () => {
        //$nextTick在修改数据后立即调用
        this.$nextTick(() => {//其回调函数在DOM更新后调用
          new Swiper ('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }) */

      // 3.利用dispatch返回promise的特性
      await this.$store.dispatch('getFoodCategories')
      new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      })
    },
/*  解决swiper不能轮播的bug
    1.watch + $nextTick
    2.dispatch + callback
    3.利用dispatch返回promise的特性 */

    /*
    3.利用dispatch返回promise的特性
    watch: {
      categories () {
        this.$nextTick(() => {
          new Swiper ('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    } */
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
