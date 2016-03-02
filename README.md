# gravatar
An utility to interact with GRAVATAR

You can easily use that tool by requiring in your app
```javascript
var Gravatar = require('gravatar');
```

Then set your email and options in contructor
```javascript
var gravatar = Gravatar('your-email', 'your-options');
```
Or add those configs via getter method
```javascript
gravatar.setEmail('your-email');
gravatar.setOptions('requireType', true);
gravatar.setOptions({ 'default': '404' });
```

Maybe you should take a look at the list options what was supported by Gravatar:
| Option      | Type     | Notes                                                      |
| ----------- |:--------:| ----------------------------------------------------------:|
| secure      | Boolean  | Make secure requests                                       |
| requireType | Boolean  | Require file-type extension after the requested email hash |
| size|s      | Number   | Size of image                                              |
| default|d   | String   | Set default image if there is no image associated with the requested email hash |
| force|f     | String   | Your avatar will be forced to default image by using f=y   |
| ranting|r   | String   | Allow user self-rate their images                          |

So, how to get your avatar image? Just do like that
```javascript
gravatar.getAvatar();
gravatar.getAvatar({ 'custom-config': 'value' });
```

###### Happy coding
