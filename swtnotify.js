/*
(The MIT License)
Copyright (c) 2016 Dmitri Roujan dmitri@cloudera.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(name, context, definition){
  window.SwtNotify = definition({}, (window.jQuery || window.$));
})('swtnotify', this, function(SwtNotify, $){
  SwtNotify.VERSION = '0.0.1';
  SwtNotify.$ = $;

  SwtNotify.Notifier = function(options){
    var defaults = {
      el : 'body', //Element which to add the object to
      template : '<table class="swt-notification"><td class="swt-notify-count"><span class="swt-value swt-data-count">3</span></td><td class="swt-notify-body swt-data-text"></td></table>',
      containerTemplate : '<div class="swt-notify-container"></div>',
      useCloseIcon: true, //Setting this to false doesn't display the close icon and make the entire notification object a close button
      autoCloseSetPointerCSS: true, //Set the CSS of the close element to pointer
      slideDuration: 700, //Set to zero to disable
      closeTemplate: '<td class="swt-close"><span class="swt-close-icon">x</span></td>',
      closeEvent: null, //You may pass an additional funciton to be called whenever a notification is closed. First argument is the object sleciton
      maxHeight: 350
    },
    opts = this._overrideDefaulOptions(defaults, options || {});
    this._setOptionsToSelf(opts);

    this._$el = $(this.el);
    this._$container = $(this.containerTemplate).css('max-height', this.maxHeight);

    //Prevent multi initialization of the container in the same element. THIS NEEDS TESTING
    this._$el.find(this._$container).remove();

    this.notiId = 0;
    this.notiDict = {};

    this.que = [];
    this._clearingQue = false;

    this._$el.prepend(this._$container);
  };

  SwtNotify.Notifier.prototype = {
    constructor: SwtNotify.Notifier,
    notify: function(body, level){
      var $duplicate = this._findDuplication(body);
      if($duplicate){
        var $count = $duplicate.closest('.swt-notification').find('.swt-data-count');
        $count.text(parseInt($count.text())+1);
      } else {
        var $notification = $(this.template).addClass('swt-level-' + (level || 'success')).wrap($('<div/>')).parent();

        $notification.find('.swt-notify-body').html(body);
        $notification.find('.swt-data-count').text(1);
        $notification.attr('swt-id', this.notiId);

        //Give the user to click on the object to close or to click a close icon to do so
        if(this.closeTemplate){
          var $co = $(this.closeTemplate);
          $notification.find('.swt-data-text').parent().append($co);
          this._setupNotificationCallback($co);
        }
        else{
          this._setupNotificationCallback($notification);
        }

        $notification.hide();

        this._$container.prepend($notification);
        this.que.push($notification);
        this.notiDict[this.notiId] = $notification;
        this.notiId++;

        if(!this._clearingQue){
          this._unhideNextInQue();
          this._clearingQue = true;
        }
      }
    },
    clear: function(notiId){
      this.notiDict[notiId].remove();
      if(this.closeCallback){
        this.closeCallback(this.notiDict[notiId]);
      }
      delete this.notiDict[notiId];
    },
    clearAll: function(){
      $.each(this.notiDict, function(key, val){
        val.remove();
      });
      this.notiDict = {};
    },
    _unhideNextInQue: function(){
      var context = this;
      if(context.que.length > 0){
        context.que.shift().slideDown(context.slideDuration, function(){
          context._unhideNextInQue();
        });
      }
      else{
        context._clearingQue = false;
      }
    },
    _overrideDefaulOptions: function (defaults, options){
      var returnObj = {};
      $.each(defaults, function(key, val){
        returnObj[key] = options[key] || defaults[key];
      });
      return returnObj;
    },
    _setOptionsToSelf: function (options){
      var context = this;
      $.each(options, function(key, val){
        context[key] = val;
      });
    },
    _setupNotificationCallback: function($target){
      var context = this;
      if(this.autoCloseSetPointerCSS){
        $target.css('cursor', 'pointer');
      }
      $target.click(function(e){
        var $target = $(e.target).closest('.swt-notification').parent(),
            id = $target.attr('swt-id');
        context.clear(id);
      });
    },
    _findDuplication: function(comparable){
      var $texts = this._$container.find('.swt-data-text');
      var $returnObj = null;
      $texts.each(function(i, element){
        var $element = $(element);
        var text = $element.text();
        if(text === comparable) {
          $returnObj = $element;
        }
      });
      return $returnObj;
    }
  };


  return SwtNotify;
});
