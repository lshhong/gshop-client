<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家90%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div>
              <Star :size="36" :score="info.serviceScore"/>
            </div>
            <span class="score">4.4</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <div>
              <Star :size="36" :score="info.foodScore"/>
            </div>
            <span class="score">4.6</span></div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <Split/>

      <RatingSelect :selectRateType="selectRateType"
                    :onlyContent="onlyContent"
                    @setSelectRateType="setSelectRateType"
                    @switchOnlyContent="switchOnlyContent"
      />

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <div>
                  <Star :size="24" :score="rating.score"/>
                </div>
                <span class="delivery">30</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont " :class="rating.rateType===0 ? 'icon-thumb_up':'icon-thumb_down'"></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.ratetime |date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import Star from '../../../components/Star/Star.vue'
  import RatingSelect from '../../../components/RatingSelect/RatingSelect.vue'
  export default {
    data(){
      return{
        selectRateType:2,//0代表满意,1代表不满意,2代表全部
        onlyContent:false //是否显示text内容
      }
    },
    computed:{
      ...mapState(['ratings','info']),
      //过滤后的评价表
      filterRatings() {
        //取出需要的数据
        const {ratings, selectRateType, onlyContent} = this
        //返回过滤后的数组
        return ratings.filter(rating =>{
          const {rateType ,text} =rating
          return (selectRateType ===2 || selectRateType === rateType)
            && (!onlyContent || text.length >0)
        })
        /*
       条件1
       selectRateType: 0/1/2
       rateType: 0/1
       selectRateType===2 || selectRateType===rateType
       */
        /*
      条件2
      onlyContent: true/false
      text: 有值/没值
      !onlyContent || text.length>0
       */
      }

    },
    mounted(){
      this.$store.dispatch('getRatings',()=>{
        this.$nextTick(()=>{
          new BScroll('.ratings',{
            click:true
          })
        })
      })
    },
    methods:{
      setSelectRateType(selectRateType){
        this.selectRateType = selectRateType
      },
      switchOnlyContent(){
        this.onlyContent = !this.onlyContent
      }
    },
    components:{
      Star,
      RatingSelect
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 225px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>

