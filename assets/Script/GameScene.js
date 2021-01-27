//import defines from './define'
//import cardnode from './card-node'

const BAOZI = 60;       //豹子
const COLORSEQ = 50;    //同花顺
const COLOR = 40;       //同花    
const SEQ = 30;         //顺子
const PAIR = 20;        //对子
const SINGLE = 10;      //单张
const TEN = 10;
const J = 11;
const Q = 12;
const K = 13;
const A = 14;
var types= {
    '60': "TRAIL",
    '50': "PURE SEQUENCE",
    '40': "SEQUENCE",
    '30': "COLOR",
    '20': "PAIR",
    '10': "HIGH CARD",
};
var cardShape1 = [];
var cardShape2 = [];
var cardValue1 = [];
var cardValue2 = [];
var result1 = 0;
var result2 = 0;
var temp = 0;
var temp1 = 0;
cc.Class({
    extends: cc.Component,

    properties: {
       cardNodes:{
            default : [],
            type : cc.Node
       },
       OptionMenu:{
            default : null,
            type : cc.Node
       },
       cards:{
            default : [],
            type : cc.Node
       },
       NumberSprites:{
            default : [],
            type : cc.Sprite
       },
       TypeSprite:{
            default : [],
            type : cc.Sprite
       },
       TypeBigSprite:{
            default : [],
            type : cc.Sprite
       },
       MaskSprite:{
            default : [],
            type : cc.Sprite
       },
       cardBG:{
            default : [],
            type : cc.Sprite
       },
       btnPack:{
            default : null,
            type : cc.Button
       },
       btnSideShow:{
            default : null,
            type : cc.Button
       },
       btnSeeCards:{
            default : null,
            type : cc.Button
       },
       btnStart:{
        default : null,
        type : cc.Button
       },
       btnNextRound:{
            default : null,
            type : cc.Button
       }, 
       typeSpriteurl:{
            default : [],
            type: cc.SpriteFrame
       },
       typBigurl:{
            default : [],
            type : cc.SpriteFrame
       },
       numberSUrl:{
            default : [],
            type : cc.SpriteFrame
       },
       compareResult:{
            default : null, 
            type : cc.Label
       },
       showTypeResult0:{
            default : null,
            type : cc.Label
       },
       selfwinnerSprite:{
            default : null,
            type : cc.Sprite
       },
       bankwinnerSprite:{
            default : null,
            type : cc.Sprite
       },
       deskWinner1Animation:{
            default : null, 
            type : cc.Animation
       },
       cardBack:{
            default : null,
            type : cc.SpriteFrame
       },
       cardBlock:{
            default : null,
            type : cc.SpriteFrame
       },
    },

  
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.onload();
    },

    onload: function(){
        this.btnNextRound.node.active = false;
        this.btnSideShow.node.active = false;
        this.btnPack.node.active = false;
        this.compareResult.node.active = false;
        this.showTypeResult0.node.active = false;
        this.selfwinnerSprite.node.active = false;
        this.bankwinnerSprite.node.active = false;
        this.btnSeeCards.node.active = false;
        
        for(var i = 0 ; i < 6 ; i++){
            this.MaskSprite[i].node.active = true;
        }
        
        this.cardNodes[0].active = false;
        this.cardNodes[1].active = false;
        this.sideShow();
    },

    onbtnCLick:function(event,cusutomData){
         switch(cusutomData){
            case "btnPack":
                this.onbtnpackCard();
                break;
            case "btnsideShow":
                this.onbtnsideShow();
                break;
            case "btnSeeCards":
                this.onbtnSeeCards();
                break;
            case "btnNextRound":
                this.onbtnNextRound();
                break;
            case "btnStart":
                this.nextRound();
                break;
            default:
                break;
        }
    },
    //重新洗牌并且发牌
    onbtnpackCard:function()
    {
        this.countTime();
        this.scheduleOnce(function(){this.btnNextRound.node.active = true;},3);
        this.dropCards();
    },
    dropCards :function(){
    
        this.btnSideShow.node.active = false;
        this.btnPack.node.active = false;
        this.btnSeeCards.node.active = false;
        /* if(!this.MaskSprite[0].node.active){
            for(var i = 0 ; i < 6 ; i++){
                this.MaskSprite[i].spriteFrame = this.cardBlock;
                this.MaskSprite[i].node.active = true;
                // this.schedule(function(){this.MaskSprite[i].runAction(cc.sequence(cc.fadeOut(1)));},1);                
            }
        } */

        for(var i = 0 ; i < 6 ; i++){
            this.MaskSprite[i].spriteFrame = this.cardBlock;
            this.MaskSprite[i].node.active = true;
            this.cardBG[i].node.active = true;
            this.NumberSprites[i].node.active = true;
            this.TypeSprite[i].node.active = true;
            this.TypeBigSprite[i].node.active = true;
            // this.schedule(function(){this.MaskSprite[i].runAction(cc.sequence(cc.fadeOut(1)));},1);                
        }

        var scaleTo = cc.scaleTo(0.3,0);
        var moveTo = cc.moveTo(0.3,cc.v2(0,150));
        this.cardNodes[0].runAction(cc.sequence(moveTo,scaleTo,null)); //逐步执行动画

        var scaleTo1 = cc.scaleTo(0.3,0);
        var moveTo1 = cc.moveTo(0.3,cc.v2(0,-150));
        this.cardNodes[1].runAction(cc.sequence(moveTo1,scaleTo1,null)); //逐步执行动画
    
        this.hideactive(false);
        
        this.sideShow();
    },

    /*按钮响应函数*/
    onbtnsideShow:function()
    {
        this.btnSideShow.node.active = false;
        this.btnPack.node.active = false;
        

        this.sideShow();      

        
        var tempcounts = 0;
        if(!this.MaskSprite[0].node.active)
        {
            tempcounts = 3;
        }else{
            tempcounts = 0;
        }

        for(var i =0;i<6;i++){
            this.MaskSprite[i].node.active = false;
            this.cardBG[i].node.active = true;
            this.NumberSprites[i].node.active = true;
            this.TypeSprite[i].node.active = true;
            this.TypeBigSprite[i].node.active = true;
        }
       
        for(var i = tempcounts; i<6;i++){
            this.cards[i].active = true;
            this.cards[i].position=cc.v2(-60,0);
            this.cards[i].angle=22;
        }
        var rotateTo = cc.rotateTo(0.2,0);
        var moveTo = cc.moveTo(0.2,cc.v2(0,18));
        this.cards[1].runAction(cc.spawn(rotateTo,moveTo));
        var rotateTo = cc.rotateTo(0.2,0);
        var moveTo = cc.moveTo(0.2,cc.v2(0,18));
        this.cards[4].runAction(cc.spawn(rotateTo,moveTo));
        var rotateTo = cc.rotateTo(0.2,-22);
        var moveTo = cc.moveTo(0.2,cc.v2(60,0));
        this.cards[2].runAction(cc.spawn(rotateTo,moveTo));
        var rotateTo = cc.rotateTo(0.2,-22);
        var moveTo = cc.moveTo(0.2,cc.v2(60,0));
        this.cards[5].runAction(cc.spawn(rotateTo,moveTo));
        this.scheduleOnce(function(){
            this.deskWinner1Animation.node.active = true;
            this.showTypeResult0.node.active = true;
            this.deskWinner1Animation.play();
            
            switch(this.jadgeIsOrNotWinner()){
        
                case true:
                    this.selfwinnerSprite.node.active = true;
                    this.bankwinnerSprite.node.active = false;
                    break;
                case false:
                    this.selfwinnerSprite.node.active = false;
                    this.bankwinnerSprite.node.active = true;
                    break;
            }
        },1);
        
        
        

        this.btnPack.node.active = false;
        this.btnSideShow.node.active = false;
        this.btnSeeCards.node.active = false;
        this.scheduleOnce(function(){this.btnNextRound.node.active = true;},2);
    },

    onbtnSeeCards : function(){
        this.cardValue();
        this.sideShow();
        for(var i = 0 ; i < 6 ; i++){
            this.cardBG[i].node.active = true;
            this.NumberSprites[i].node.active = true;
            this.TypeSprite[i].node.active = true;
            this.TypeBigSprite[i].node.active = true;
            if(i <3){
                this.MaskSprite[i].spriteFrame = this.cardBack;
                this.MaskSprite[i].node.active = false;
              
                // this.schedule(function(){this.MaskSprite[i].runAction(cc.sequence(cc.fadeOut(1)));},1);
            }else{
                this.MaskSprite[i].node.active = true;
            }
        }
        for(var i =0; i<3;i++){
            this.cards[i].active = true;
            this.cards[i].position=cc.v2(-60,0);
            this.cards[i].angle=22;
        }
        
        var rotateTo = cc.rotateTo(0.2,0);
        var moveTo = cc.moveTo(0.2,cc.v2(0,18));
        this.cards[1].runAction(cc.spawn(rotateTo,moveTo));
        var rotateTo = cc.rotateTo(0.2,-22);
        var moveTo = cc.moveTo(0.2,cc.v2(60,0));
        this.cards[2].runAction(cc.spawn(rotateTo,moveTo));
        
        this.btnSeeCards.node.active = false;
        this.MaskSprite[0].node.active = false;
        this.MaskSprite[1].node.active = false;
        this.MaskSprite[2].node.active = false;
        
        
        
    },

    onbtnNextRound : function(){
        this.unscheduleAllCallbacks();
        this.dropCards();
        this.btnNextRound.node.active = false;
        this.countTime();
    },

    countTime : function(){
        var tempInt = 2;
        this.schedule(function(){
            if(tempInt > 0){
                this.compareResult.node.active = true;
                this.compareResult.string = "The game starts counting down……" + tempInt;
 
            }else{
                this.compareResult.node.active = false;
                this.unscheduleAllCallbacks();
                this.nextRound();
            }

            tempInt -=1; 
        },1);
    },

    nextRound: function(){
        for(var i = 0 ; i < 6 ; i++){
                this.MaskSprite[i].spriteFrame = this.cardBack;
                 this.MaskSprite[i].node.active = true; 
                this.cardBG[i].node.active = false;
                this.NumberSprites[i].node.active = false;
                this.TypeSprite[i].node.active = false;
                this.TypeBigSprite[i].node.active = false;
                // this.schedule(function(){this.MaskSprite[i].runAction(cc.sequence(cc.fadeOut(1)));},1);
        }
        for(var i =1; i<3;i++){
            this.cards[i].active = true;
            //this.cards[i].setPosition(-60,0);
            this.cards[i].position= cc.v2(-60,0);
            this.cards[i].angle= 22;
            //this.cards[i].setRotation(22);

            this.cards[i+3].active = true;
            //this.cards[i].setPosition(-60,0);
            this.cards[i+3].position= cc.v2(-60,0);
            this.cards[i+3].angle= 22;
        }
        var rotateTo = cc.rotateTo(0.2,0);
        var moveTo = cc.moveTo(0.2,cc.v2(0,18));
        this.cards[1].runAction(cc.spawn(rotateTo,moveTo));
        var rotateTo = cc.rotateTo(0.2,0);
        var moveTo = cc.moveTo(0.2,cc.v2(0,18));
        this.cards[4].runAction(cc.spawn(rotateTo,moveTo));
        var rotateTo = cc.rotateTo(0.2,-22);
        var moveTo = cc.moveTo(0.2,cc.v2(60,0));
        this.cards[2].runAction(cc.spawn(rotateTo,moveTo));
        var rotateTo = cc.rotateTo(0.2,-22);
        var moveTo = cc.moveTo(0.2,cc.v2(60,0));
        this.cards[5].runAction(cc.spawn(rotateTo,moveTo));


        this.btnStart.node.active =false;
        this.btnSeeCards.node.active = true;
        //this.scheduleOnce(function(){this.btnSeeCards.node.active = true;},1);
        this.btnNextRound.node.active = false;
        this.btnSideShow.node.active = true;
        this.selfwinnerSprite.node.active = false;
        this.deskWinner1Animation.node.active = false;
        this.bankwinnerSprite.node.active = false;
        this.selfwinnerSprite.node.active = false;
        this.btnPack.node.active = true;
 
        for(var i =0; i<2;i++){
            this.cardNodes[i].active = true;
            this.cardNodes[i].setPosition(0,0);
            this.cardNodes[i].setScale(1);
        }

        for(var i = 0 ;i< 6;i++){
            this.MaskSprite[i].spriteFrame = this.cardBack;
            this.MaskSprite[i].node.active = true;
        }
        
        this.resetTable();
        this.cardValue();
    },

    hideactive: function(isShow){
        this.compareResult.node.active = isShow;
        this.showTypeResult0.node.active = isShow;
        this.selfwinnerSprite.node.active = isShow;
        this.bankwinnerSprite.node.active = isShow;
        this.deskWinner1Animation.node.active = isShow;

    },

    /*发牌 */
    cardValue:function(){
        this.resetTable();
        for(var i = 0; i < 3 ; i++){
            /*玩家和庄家随机牌型*/
            
            temp = Math.ceil((0 + (3 - 1 + 1 ) * Math.random()));
            temp1 = Math.ceil((0 + (3 - 1 + 1 ) * Math.random()));
            cardShape1.push(temp);
            cardShape2.push(temp1);
            /*玩家和庄家随机牌值*/
            temp = Math.ceil((2 + (13 - 2 + 1 ) * Math.random()));
            temp1 = Math.ceil((2 + (13 - 2 + 1 ) * Math.random()));
            cardValue1.push(temp);
            cardValue2.push(temp1);
            /*玩家和庄家牌值合算*/
            result1 = result1 + cardValue1[i];
            result2 = result2 + cardValue2[i];
        }       
        
        this.checkHandCard();
    },

    /*玩家和庄家 手牌显示函数*/
    sideShow:function(){
        this.sortCardANDType(cardValue1,cardShape1);
        this.sortCardANDType(cardValue2,cardShape2);
        for(var i = 0 ;i < 3; i++){
            this.TypeSprite[i+3].spriteFrame = this.typeSpriteurl[(cardShape2[i]-1)];
            this.TypeSprite[i].spriteFrame = this.typeSpriteurl[(cardShape1[i]-1)];
            var temptypeBigSpriteIndex = 3;
            if(cardValue1[i] >J&& cardValue1[i] <A)
            {
                temptypeBigSpriteIndex += cardValue1[i] - TEN;
                this.TypeBigSprite[i].spriteFrame = this.typBigurl[temptypeBigSpriteIndex];
            }else{
                this.TypeBigSprite[i].spriteFrame = this.typBigurl[(cardShape1[i]-1)];
            }
            
            
            if(cardValue2[i] >J&& cardValue2[i] <A)
            {
                temptypeBigSpriteIndex += cardValue2[i] - TEN;
                this.TypeBigSprite[i+3].spriteFrame = this.typBigurl[temptypeBigSpriteIndex];
            }else{
                this.TypeBigSprite[i+3].spriteFrame = this.typBigurl[(cardShape2[i]-1)];
            }
            
    
            switch(cardShape1[i]){
               case 1:
               case 3:
                   this.NumberSprites[i].spriteFrame = this.numberSUrl[(cardValue1[i]+11)];
                   break;
               case 2:
               case 4:
                    this.NumberSprites[i].spriteFrame = this.numberSUrl[(cardValue1[i])-2];
                    break;
               default:
                   break;
            }
            switch(cardShape2[i]){
                case 1:
                case 3:
                    this.NumberSprites[i+3].spriteFrame = this.numberSUrl[(cardValue2[i]+11)];
                    break;
                case 2:
                case 4:
                    this.NumberSprites[i+3].spriteFrame = this.numberSUrl[(cardValue2[i]-2)];
                default:
                    break;
             }

       }

    },

    /*检测双方手中有同样的牌  重复就重新发牌*/
    checkHandCard:function(){
        for(var i = 0;i<3;i++){
            for(var j = 0; j <3 ;j++){
                if(cardShape1[i] == cardShape2[j] && cardValue1[i] == cardValue2[j])
                {
                    this.cardValue();
                }
            }
        }
        
        if(cardShape1[0] == cardShape1[1] && cardValue1[0] == cardValue1[1]){
            temp = Math.ceil((1 + (3 - 1 + 1 ) * Math.random()));
            temp1 = Math.ceil((2 + (13 - 2 + 1 ) * Math.random()));
            if(temp != cardShape1[0] && temp1 != cardValue1[0]){  
               cardShape1[0] = temp;
               cardValue1[0] = temp1;
            }else{
               this.cardValue();
           }
        }

         if(cardShape1[0] == cardShape1[2] && cardValue1[0] == cardValue1[2]){
             temp = Math.ceil((1 + (3 - 1 + 1 ) * Math.random()));
             temp1 = Math.ceil((2 + (13 - 2 + 1 ) * Math.random()));
             if(temp != cardShape1[0] && temp1 != cardValue1[0]){
                cardShape1[0] = temp;
                cardValue1[0] = temp1;
             }else{ 
                this.cardValue();
            }
         }
         
         if(cardShape1[1] == cardShape1[2] && cardValue1[1] == cardValue1[2]){
            temp = Math.ceil((1 + (3 - 1 + 1 ) * Math.random()));
            temp1 = Math.ceil((2 + (13 - 2 + 1 ) * Math.random()));
            if(temp != cardShape1[1] && temp1 != cardValue1[1]){
               cardShape1[1] = temp;
               cardValue1[1] = temp1;
            }else{
               this.cardValue();
           }
        }
        if(cardShape2[0] == cardShape2[1] && cardValue2[0] == cardValue2[1]){
            temp = Math.ceil((1 + (3 - 1 + 1 ) * Math.random()));
            temp1 = Math.ceil((2 + (13 - 2 + 1 ) * Math.random()));
            if(temp != cardShape2[0] && temp1 != cardValue2[0]){
               cardShape2[0] = temp;
               cardValue2[0] = temp1;
            }else{
               this.cardValue();
           }
        }

        if(cardShape2[0] == cardShape2[2] && cardValue2[0] == cardValue2[2]){
            temp = Math.ceil((1 + (3 - 1 + 1 ) * Math.random()));
            temp1 = Math.ceil((2 + (13 - 2 + 1 ) * Math.random()));
            if(temp != cardShape2[0] && temp1 != cardValue2[0]){
               cardShape2[0] = temp;
               cardValue2[0] = temp1;
            }else{
               this.cardValue();
           }
        }

        if(cardShape2[1] == cardShape2[2] && cardValue2[1] == cardValue2[2]){
            temp = Math.ceil((1 + (3 - 1 + 1 ) * Math.random()));
            temp1 = Math.ceil((2 + (13 - 2 + 1 ) * Math.random()));
            if(temp != cardShape2[0] && temp1 != cardValue2[0]){
               cardShape2[1] = temp;
               cardValue2[1] = temp1;
            }else{
               this.cardValue();
           }
        }        
    },

    /*检测手中牌型*/
    checkHandType:function(CardHandValue,CardHandType){
        if(this.checkbaozi(CardHandValue) > 0){
            return BAOZI; 
        }else if(this.checktonghuashun(CardHandValue,CardHandType) > 0){
            return COLORSEQ; 
        }else if(this.checktonghua(CardHandType) > 0){
            return COLOR; 
        }else if(this.checkshunzi(CardHandValue) > 0){
            return SEQ;
        }else if(this.checkduizi(CardHandValue) > 0){
            return PAIR; 
        }else if(this.checkdanzhang(CardHandValue) > 0){
            return SINGLE; 
        }
    },

    /*检测豹子*/
    checkbaozi: function(CardHandValue){
        
        if(CardHandValue[0] == CardHandValue[1] && CardHandValue[1] == CardHandValue[2]){
            //cc.log("豹子");
            return 60;
        }else{
            return 0;
        }
    },

    /*检测同花顺*/
    checktonghuashun: function(CardHandValue,CardHandType){
        
        if((CardHandValue[0] + 1 == CardHandValue[1] + 1 &&  CardHandValue[1] + 1 == CardHandValue[2])){
            if(CardHandType[0] == CardHandType[1] && CardHandType[1] == CardHandType[2]){
                //cc.log("同花顺");
                return 50;
            }
        }else{
            return 0;
        }
        
    },

    /*检测同花*/
    checktonghua: function(CardHandType){
       
        if(CardHandType[0] == CardHandType[1] && CardHandType[1] == CardHandType[2]){
            //cc.log("同花");
            return 40;
        }else{
            return 0;
        }
        
    },

    /*检测顺子*/
    checkshunzi : function(CardHandValue){
        if(CardHandValue[0] + 1 == CardHandValue[1] && CardHandValue[1] + 1 == CardHandValue[2]){
            //cc.log("顺子");
            return 30;
        }else{
            return 0;
        }
    },

    /*检测对子*/
    checkduizi : function(CardHandValue){
        var tempcount = 0;

        if(CardHandValue[0] == CardHandValue[1] || CardHandValue[0] == CardHandValue[2] || CardHandValue[1] == CardHandValue[2]){
            tempcount += 1;
        }

        if(tempcount == 1){
            //cc.log("对子");
             return 20;  
        }else{
            return 0;
        }
    },

    /*检测单张*/
    checkdanzhang : function(CardHandValue){
        var tempcount = 0;
        
        if(CardHandValue[0] == CardHandValue[1] || CardHandValue[0] == CardHandValue[2] || CardHandValue[1] == CardHandValue[2]){
            tempcount += 1;
        }

        if(tempcount == 0){
            //cc.log("单张");
            return 10;  
        }else{
            return 0;
        }
    },

    /*判断玩家是否为赢家*/
    jadgeIsOrNotWinner:function(){
        var handtype = this.checkHandType(cardValue1,cardShape1) ;
        var handtype1 = this.checkHandType(cardValue2,cardShape2) ;
        this.schedule(function(){},0.5);
        
        this.showTypeResult0.string = types[handtype.toString()];

        if(handtype > handtype1){
            return true;
        }else if (handtype < handtype1){
            return false;
        }
        else if (handtype == handtype1){
            if(result1 > result2 ){
                
                return true;
            }else{
                return false;
            }
        }

    },
    
    /*重置手牌数据*/
    resetTable:function(){
        cardShape1 = [];
        cardShape2 = [];
        cardValue1 = [];
        cardValue2 = [];
        temp = 0;
        temp1 = 0;
        result1 = 0;
        result2 = 0;
    },
    
    /*手牌排序*/
    sortCardANDType:function(CardHandValue,CardHandType){
        for(var i = 0;i<3;i++){
            for (var j = 0 ; j+1<3-i ; j++)
            if(CardHandValue[j] > CardHandValue[j+1]){
                var tempvalue = CardHandValue[j];
                var tempvalue1 = CardHandValue[j+1];
                var temptype = CardHandType[j];
                var temptype1 = CardHandType[j+1];  
                CardHandValue[j] = tempvalue1;
                CardHandValue[j+1] = tempvalue;
                CardHandType[j] = temptype1;
                CardHandType[j+1] = temptype;
            }
        }
    }
    //,update (dt) {},
});

