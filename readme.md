#SwtNotify.js

Hello, thank you for showing interest in my notification library! This was created as part of a Cloudera Hackathon. None of the current popular notification libraries supported the UX I was interested in without a lot of effort, so I decided to write my own.

SwtNotify is a simple and customizable library for notifications. The primary goal of this library is to ensure that the user acknowledges the notification before it disappears. The secondary goal is to make better use of screen space following the initial premise to make the notification more difficult to miss.

##Features

- Material Design
- Auto Stacking Identical Messages
- Lightweight
- Multiple notifiers allow for easy componentized design

##Installation and Initialization
Download the zip and extract both the .js and .css in their corresponding folders. Import both files. SwtNotify lives under the SwtNotify global namespace.

##Requirements
Jquery 1.6 or higher

##Usage
Creating a new instance

```
var notifier = new SwtNotify.Notifier();

```

You may also pass an options object to Notifier when initializing. Here are the options:

`el` - `body`, Element which to add the object to.

`template` - `<table class="swt-notification"><td class="swt-notify-count"><span class="swt-value swt-data-count">3</span></td><td class="swt-notify-body swt-data-text"></td></table>`, The notification template. Must have `swt-notification` as the outer most container. Must have `swt-data-text` and `swt-data-count` somewhere inside.

`containerTemplate` - `'<div class="swt-notify-container"></div>'`, Template for container of all the notifications.

`useCloseIcon` - `true`, Setting this to false doesn't display the close icon and make the entire notification object a close button.

`autoCloseSetPointerCSS` - `true` Sets the CSS of the close element to pointer.

`slideDuration` - `700`, Set to zero to disable.

`closeTemplate` - `'<td class="swt-close"><span class="swt-close-icon">x</span></td>'`, The template for the close icon.

`closeEvent` - `null`, You may pass an additional function to be called whenever a notification is closed. First argument is the object selection.

`maxHeight` - `350`, Set the max height of the notification container.

##Credits
- Dmitri Roujan (development)
- Hipster Ipsum (filler-text)

## License
(The MIT License)
Copyright (c) 2016 Dmitri Roujan dmitri@cloudera.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
