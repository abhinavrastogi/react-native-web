Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/components/ScrollView/PagingScrollViewBase.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _View=require('../View');var _View2=_interopRequireDefault(_View);var _Animated=require('../../apis/Animated');var _Animated2=_interopRequireDefault(_Animated);var _Easing=require('animated/lib/Easing');var _Easing2=_interopRequireDefault(_Easing);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var normalizeScrollEvent=function normalizeScrollEvent(parent,xOffset){return{nativeEvent:{contentOffset:{x:xOffset,y:0},contentSize:{height:parent._contentHeight,width:parent._contentWidth},layoutMeasurement:{height:parent._parentHeight,width:parent._parentWidth}},timeStamp:Date.now()};};var PagingScrollViewBase=function(_Component){_inherits(PagingScrollViewBase,_Component);function PagingScrollViewBase(props){_classCallCheck(this,PagingScrollViewBase);var _this=_possibleConstructorReturn(this,(PagingScrollViewBase.__proto__||Object.getPrototypeOf(PagingScrollViewBase)).call(this,props));_this._onContentLayout=function(e){_this._contentWidth=e.nativeEvent.layout.width;_this._contentHeight=e.nativeEvent.layout.height;_this._updatePositions();};_this._onParentLayout=function(e){_this._parentWidth=e.nativeEvent.layout.width;_this._parentHeight=e.nativeEvent.layout.height;_this._updatePositions();};_this._offsetChange=function(e){if(_this.props.onScroll){_this.props.onScroll(normalizeScrollEvent(_this,-1*e.value));}};_this._onTouchStart=_this._onTouchStart.bind(_this);_this._onTouchEnd=_this._onTouchEnd.bind(_this);_this._onTouchMove=_this._onTouchMove.bind(_this);_this._totalOffset=0;_this._startPos=0;_this._currentSelPosition=0;_this._scrollItemCount=0;_this._contentWidth=720;_this._contentHeight=720;_this._parentWidth=0;_this._parentHeight=0;_this._currentOffset=new _Animated2.default.Value(0);return _this;}_createClass(PagingScrollViewBase,[{key:'componentWillMount',value:function componentWillMount(){this._currentOffset.addListener(this._offsetChange);}},{key:'componentWillUnmount',value:function componentWillUnmount(){this._currentOffset.removeListener(this._offsetChange);}},{key:'_updatePositions',value:function _updatePositions(){this._scrollItemCount=Math.ceil(this._contentWidth/this._parentWidth);this.maxPositiveTransform=this._contentWidth-this._parentWidth;this.pixelThreshold=this._parentWidth/3;}},{key:'_getCurrentTimeInSec',value:function _getCurrentTimeInSec(){return new Date().getTime()/1000;}},{key:'_onTouchMove',value:function _onTouchMove(e){this.offset=this._startPos-e.touches[0].pageX;var newOffset=this._totalOffset+this.offset;if(newOffset<0){this.offset=0;this._totalOffset=newOffset=0;}else if(newOffset>this.maxPositiveTransform){this.offset=0;this._totalOffset=newOffset=this.maxPositiveTransform;}this._currentOffset.setValue(-newOffset);}},{key:'_onTouchStart',value:function _onTouchStart(e){this._startPos=e.touches[0].pageX;this.animationStartTS=this._getCurrentTimeInSec();}},{key:'_onTouchEnd',value:function _onTouchEnd(e){var totalPixelsCovered=this.offset;this._totalOffset+=this.offset;var moveVelocity=totalPixelsCovered/(this._getCurrentTimeInSec()-this.animationStartTS);if(moveVelocity<-this.pixelThreshold){this._currentSelPosition=Math.max(0,this._currentSelPosition-1);}else if(moveVelocity>this.pixelThreshold){this._currentSelPosition=Math.min(this._scrollItemCount-1,this._currentSelPosition+1);}else{this._currentSelPosition=this._getPositionMetaForX(this._totalOffset);}this._scrollToCurrentPosition();}},{key:'_getPositionMetaForX',value:function _getPositionMetaForX(x){return Math.round(x/this._parentWidth);}},{key:'_scrollToCurrentPosition',value:function _scrollToCurrentPosition(){var correctOffsetForPosition=this._parentWidth*this._currentSelPosition;this._totalOffset=correctOffsetForPosition;this.offset=0;_Animated2.default.timing(this._currentOffset,{toValue:-correctOffsetForPosition,easing:_Easing2.default.easeOut}).start();}},{key:'render',value:function render(){var _this2=this;var _props=this.props,onScroll=_props.onScroll,scrollEnabled=_props.scrollEnabled,style=_props.style,onMomentumScrollBegin=_props.onMomentumScrollBegin,onMomentumScrollEnd=_props.onMomentumScrollEnd,onScrollBeginDrag=_props.onScrollBeginDrag,onScrollEndDrag=_props.onScrollEndDrag,removeClippedSubviews=_props.removeClippedSubviews,scrollEventThrottle=_props.scrollEventThrottle,showsHorizontalScrollIndicator=_props.showsHorizontalScrollIndicator,showsVerticalScrollIndicator=_props.showsVerticalScrollIndicator,other=_objectWithoutProperties(_props,['onScroll','scrollEnabled','style','onMomentumScrollBegin','onMomentumScrollEnd','onScrollBeginDrag','onScrollEndDrag','removeClippedSubviews','scrollEventThrottle','showsHorizontalScrollIndicator','showsVerticalScrollIndicator']);return _react2.default.createElement(_View2.default,{onLayout:this._onParentLayout,onTouchEnd:this._onTouchEnd,onTouchMove:this._onTouchMove,onTouchStart:this._onTouchStart,style:{flex:1,overflow:'hidden'},__source:{fileName:_jsxFileName,lineNumber:174}},_react2.default.createElement(_Animated2.default.View,_extends({ref:function ref(x){return _this2._contentRef=x;},onLayout:this._onContentLayout,style:{flex:1,transform:[{translateX:this._currentOffset}]}},other,{__source:{fileName:_jsxFileName,lineNumber:181}})));}}]);return PagingScrollViewBase;}(_react.Component);exports.default=PagingScrollViewBase;PagingScrollViewBase.propTypes=process.env.NODE_ENV!=="production"?{onScroll:_react2.default.PropTypes.func}:{};