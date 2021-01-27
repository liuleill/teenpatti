(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/card-node.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fee30RmaBZIn4U4S7/tE6Kj', 'card-node', __filename);
// Script/card-node.js

"use strict";

var _define = require("./define");

var _define2 = _interopRequireDefault(_define);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        sprite_frames: {
            default: null,
            type: cc.SpriteAtlas
        }
    },

    onLoad: function onLoad() {
        this.addComponent(cc.Sprite).spriteFrame = this.sprite_frames.getSpriteFrame("card_black");
    },

    showCard: function showCard(data) {
        console.log("show card data = " + JSON.stringify(data));
        var value = data.value;
        var shape = data.shape;
        var nameStr = "card_" + _define2.default.cardShapeMap[shape] + _define2.default.cardValueMap[value];
        console.log("name str = " + nameStr);
        this.getComponent(cc.Sprite).spriteFrame = this.sprite_frames.getSpriteFrame(nameStr);
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=card-node.js.map
        