

(function( win, doc, scr){

    var iScreenHeight = scr.height;
    var iScreenWidth  = scr.width;

    var iDeltaLeft = 79;

    var Popup = function _construct( sName){

        var _oPopup = null, _oInfo = {}, _url = '';

        sName = sName || '--';
        /**
         * [_computeSnap description]
         * @param  {[type]} sSnap [description]
         * @return {[type]}       [description]
         */
        function _computeSnap( sSnap, width, height){

            var left  = 0;
            var top   = 0;
            var sSens = null;

            sSnap     = sSnap || 'center';
            sSnap     = sSnap.toLowerCase();

            if( sSnap.indexOf( 'top') >=0){
                top   = 0;
                sSens = 'hor';
            }

            if( sSnap.indexOf( 'bottom') >=0){
                top   = iScreenHeight - height;
                sSens = 'hor';
            }

            if( sSnap.indexOf( 'left') >=0){
                left  = 0;
                sSens = 'ver';
            }

            if( sSnap.indexOf( 'right')>=0){
                left  = iScreenWidth - width;
                sSens = 'ver';
            }

            if( sSnap.indexOf( 'center')>=0){

                if( sSens){

                    if( sSens == 'hor'){
                         left = (iScreenWidth/2) -(width/2);
                    }else{
                        top  = (iScreenHeight/2) - (height/2);
                    }

                }else{

                    top  = (iScreenHeight/2) - (height/2);
                    left = (iScreenWidth/2) -(width/2);

                }
            }


            _oInfo.top  = top;
            _oInfo.left = left;


            return _public;
        }

        /**
         * [_getWindowInfo description]
         * @return {[type]} [description]
         */
        function _getWindowInfo(){
            var iWindowWidth  =   doc.documentElement.clientWidth  || win.innerWidth  || scr.availWidth  ;
            var iWindowHeight =   doc.documentElement.clientHeight || win.innerHeight || scr.availHeight ;

            var iWindowTop    = win.screenY || scr.availTop  || win.screenTop;//OK
            var iWindowLeft   = win.screenX || scr.availLeft || win.screenLeft;//OK

            return {
                width  : iWindowWidth,
                height : iWindowHeight,
                top    : iWindowTop,
                left   : iWindowLeft
            };
        }


        /**
         * [open description]
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        function open( url, width, height, sSnap){

            if( arguments.length > 1){
                _oInfo.width  = width  ||  iScreenWidth;
                _oInfo.height = height ||  iScreenHeight;
                _url = url;

                _computeSnap( sSnap, width, height);
            }else if( arguments.length == 1){
                _url = url;
            }

            _oPopup  = window.open( _url, sName,'scrollbars=yes,toolbar=no,resizable=yes,width=' + _oInfo.width + ',height=' + _oInfo.height + ',top=' + _oInfo.top + ',left=' + _oInfo.left + ',menubar=no');

            return _public;
        }

        /**
         * [resizeTo description]
         * @param  {[type]} width  [description]
         * @param  {[type]} height [description]
         * @return {[type]}        [description]
         */
        function resizeTo( width, height){

            if( isOpen()){
                _oPopup.resizeTo( width, height);
            }

            return _public;
        }

        /**
         * [moveTO description]
         * @param  {[type]} x [description]
         * @param  {[type]} y [description]
         * @return {[type]}   [description]
         */
        function moveTo( x, y){

            if( isOpen()){
                var iNewX = /*info.top  +*/ x;
                var iNewY = /*info.left +*/ y;
                _oPopup.moveTo(  iNewX , iNewY );
            }

            return _public;
        }

        /**
         * [isOpen description]
         * @return {Boolean} [description]
         */
        function isOpen(){
            return ( _oPopup !== null);
        }

        /**
         * [close description]
         * @return {[type]} [description]
         */
        function close(){
            if( isOpen()){
                _oPopup.close();
                _oPopup = null;
                _oInfo  = {};
                _url    = '';
            }
            return _public;
        }

        var _public = {
            info     : _oInfo,
            isOpen   : isOpen,
            resizeTo : resizeTo,
            moveTo   : moveTo,
            open     : open,
            close    : close
        };

        return _public;
    };


    win.Popup = Popup;

}( window, document, window.screen));
