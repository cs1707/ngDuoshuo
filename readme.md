###ngDuoshuo
an duoshuo directive for angularjs

###usage
####Add the script to your app
```
<script src="ngDuoshuo.js"></script>
```
####Add `ngDuoshuo` to required modules list
``` javascript
angular.module("myApp", ["ngDuoshuo"])
```
####Register your shortname

by configure with `$duoshuoProvider` and registering it via `$duoshuoProvider.setShortName`

####Using the directives
######显示多说评论框
```
<div  duoshuo 
      thread-key=" " //required
      url=""
      title=""
      image=""
      authorKey=""
      limit=""
      order=""
</div>
```
>`data-thread-key` `string` 推荐
>
>文章在原站点中的id或其他唯一标识。通用代码中，将您站点中的文章id告知我们，是区分文章，解决分页问题的好方法，评论回流时，也以此来定位原站点文章，同id的文章，显示的是相同的评论内容。data-thread-key中:和,即冒号和逗号有特别的用途，请不要使用url或其他有这两个符号的内容作为data-thread-key。示例：在typecho建站系统中，data-thread-key="<?php echo $this->cid;?>",phpcms中data-thread-key="{id_encode("content_$catid",$id,$siteid)}"，如果您在独立静态页中使用，可以自己设置合适的值，例如首页使用data-thread-key="index"，我们在管理后台的“工具”选项卡里提供了更多建站类型的示例。
>
>`data-title` `string` 推荐
>
>您的文章标题。对于通用代码，没有提前同步文章数据。如果您在后台管理看到的文章标题不正确，加入这个参数，让您在后台管理时更加便利
>
>`data-image` `string` 推荐
>
>文章图片地址，将用于转发时的附图。
>
>`data-url` `string`
>
>文章的url。第一次显示评论框时，我们会按这个参数标记文章。
>
>如果您改变了域名，或者希望几篇文章显示同一评论框，传递data-url即可解决
>
>例如之前一篇文章是链接地址是"http://abc.com/101.html" ，上面已经有100个评论，之后这篇文章有了分页，在这分页里加上data-url="http://abc.com/101.html" ，两个页面就都会显示相同的评论内容了。
>
>注意：在没有设置data-url项目时，我们优先采用页面中canonical标签值，如果没有设置canonical标签，则会使用页面的url。页面url会自动过滤#之后的参数。对于设置了不同的data-thread-key之后，还发现多篇文章出现相同评论的情况，请确认一下页面中的canonical标签是否重复。
>
>`data-author-key` `string` 推荐
>
>作者在本站中的id。对于wordpress插件，文章如果填写该id，可以识别作者，在收到评论时，会对该作者发出邮件提醒。通用代码用户及其他插件，如果需要通过这种方式获取邮件，请跟我们联系： 1175762238，联系时请告知你的多说二级域名，data-author-key的值，已经相应的管理员email地址
>
>`data-limit` `int`
>
>单页显示评论数，取值范围:`1～200`
>
>`data-order` `string`
>
>排序方式，取值：`asc`(从旧到新),`desc`从新到旧)

#####显示最新评论
```
<div ds-recent-comments 
     num-items=""
     show-avatars=""
     show-time=""
     show-title=""
     show-admin=""
     excerpt-length=""
</div>
```
```
//以下参数均为可选
data-num-items="10"     //显示最新评论的条数，最大支持200条
data-show-avatars="1"   //是否显示头像，1：显示，0：不显示
data-show-time="1"      //是否显示时间，1：显示，0：不显示
data-show-title="0"     //是否显示标题，1：显示，0：不显示
data-show-admin="1"     //是否显示管理员的评论，1：显示，0：不显示
data-excerpt-length="70"//最大显示评论汉字数
```
#####显示最近访客
```
<div ds-recent-visitors
     num-items=""
</div>
```
```
data-num-items="10"     //显示访客的数量
```
#####显示热评文章
```
<div ds-top-threads
     range=""
     num-items=""
</div>
```
```
//以下参数均为可选参数
data-range="weekly"      //热评统计时间范围：daily：日；weekly：周；monthly：月；默认值daily
data-num-items="5"     //显示最新文章的条数，默认值5
```
#####显示文章评论数
```
<div ds-thread-count
     thread-key="" //required
     count-type=""
</div>
```
>`data-thread-key` `string` 必须
>
>文章在原站点中的id或其他唯一标识。
>
>`data-count-type` `string` 可选
>
>获取的计数类型。`comments`：评论数；`weibo_reposts`：新浪微博转发数；`qqt_reposts`：腾讯微博转发数。默认值为`comments`。
###License
MIT




