

(function( global, doc){

    /**
     * [_merge description]
     * @param  {[type]} oOptionDef [description]
     * @param  {[type]} oOption    [description]
     * @return {[type]}            [description]
     */
    function _merge( oOptionDef, oOption){
        var sKey;
        for( sKey in oOption){
            oOptionDef[sKey] = oOption[sKey];
        }

        return oOptionDef;
    }

    /***************************************************************
     *
     ***************************************************************/
    /**
     * [Draggable description]
     */
    var Draggable = function _construct( oElement, oOption){
        var _oOption = {
            callback : {}
        }, name = 'drag';

        /**
         * [_init description]
         * @return {[type]} [description]
         */
        function _init( oOption){
            _oOption = _merge( _oOption, oOption);
        }

        /**
         * SORTIE
         */
        var _public = {};

        _init( oOption);

        return _public;
    };

    /*************************************************************
     * [Droppable description]
     ************************************************************/
    var Droppable = function _construct( oElement, oOption){

        var _oOption = {}, name = 'drop', target = oElement;

        /**
         * [_init description]
         * @return {[type]} [description]
         */
        function _init( oOption){

            if( typeof oOption === 'function'){
                _oOption.onDrop.default = oOption;
            }else{
                _oOption = _merge( _oOption, oOption);
            }

            _addEventInit( target);
        }

        /**
         * [_launchEvent description]
         * @param  {[type]} sType [description]
         * @param  {[type]} e     [description]
         * @return {[type]}       [description]
         */
        function _launchEvent( sType, e){
            if( _oOption[sType]){
                _oOption[sType].call( _public, e);
            }
        }

        function addEvent( sEvent, fCallBack){

            var sType       = sEvent.toLowerCase();

            if( sType.indexOf('on') === 0){
                sType = sType.replace('on', '');
            }

            _oOption[sType] = fCallBack;
        }

        /**
         * [_addEventInit description]
         * @param {[type]} oElement [description]
         */
        function _addEventInit( oElement){

            oElement.addEventListener('dragover', function(e){
                e.preventDefault();
                _launchEvent( 'dragover', e);
            });

            oElement.addEventListener('dragenter', function(e){
                e.preventDefault();
                _launchEvent( 'dragenter', e);
            });

            oElement.addEventListener('dragleave', function(e){
                e.preventDefault();
                _launchEvent( 'dragleave', e);
            });

            oElement.addEventListener('drop', function(e){
                e.preventDefault();

                var sType = _getDataType( e);
                var mData = _getDataValue( e, sType);

                if( _oOption.onDrop[sType]){

                    _oOption.onDrop[sType].call( _public, mData);
                }else if( _oOption['default']){
                    _oOption['default'].call( _public, mData, sType);
                }
            });
        }

        /**
         * [_getDataValue description]
         * @param  {[type]} e     [description]
         * @param  {[type]} sType [description]
         * @return {[type]}       [description]
         */
        function _getDataValue( e, sType){
            var mData = null;

            switch( sType){

                case 'file':
                    mData = e.dataTransfer.files;
                    break;

                case 'link':
                    mData = e.dataTransfer.getData("text/plain");
                    break;

                case 'image':
                    var sHtml     = e.dataTransfer.getData("text/html");
                    var div       = doc.createElement('div');
                    div.innerHTML = sHtml;
                    mData         = div.querySelector('img').getAttribute('src');
                    break;

                default:
                    mData = e.dataTransfer.getData( e.dataTransfer.types[0]);
                    break;
            }

            return mData;

        }

        /**
         * [getDataType description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        function _getDataType( e){

            var sType   = e.dataTransfer.types[0];
            var sReturn = sType;

            switch( sType){
                case 'Files':
                    sReturn = 'file';
                    break;

                case 'text/plain':
                    sReturn = 'link';
                    break;


                case 'text/uri-list':
                    sReturn = 'image';
                    break;

                default:
                    break;
            }

            return ( sReturn)? sReturn.replace("/", "_") : 'element';

        }


        /**
         * SORTIE
         */
        var _public = {
            addEvent : addEvent,
            target : target
        };


        _init( oOption);

        return _public;
    };

    /**
     * [Droppable description]
     * @param {[type]} oElement [description]
     * @param {[type]} oOption  [description]
     */
    var DroppableContainer = function( oElement, oOption){

        var _aElementDroppable = [];

        function addEvent( sEvent, fCallBack){

            for( var i = 0; i < _aElementDroppable.length; i++){
               _aElementDroppable[i].addEvent( sEvent, fCallBack);
            }

            return _public;
        }

        /**
         * [name description]
         * @type {[type]}
         */
        if( oElement.constructor.name == 'NodeList'){

            for( var i = 0; i < oElement.length; i++){
                _aElementDroppable.push( Droppable( oElement[ i ], oOption));
            }

        }else{

            _aElementDroppable.push( Droppable( oElement, oOption));

        }

        /**
         *
         */
        var _public = {
            addEvent : addEvent
        };

        return _public;
    };

    global.Draggable = Draggable;
    global.Droppable = DroppableContainer;

}( window, document));
